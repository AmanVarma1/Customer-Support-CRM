function formatDate(date) {
    if (!date) {
        return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "—";
    }

    return parsedDate.toLocaleString();
}


function getStatusFromText(text) {
    if (!text) {
        return null;
    }

    // Handles:
    // "Status changed from Open to In Progress"
    // "Status changed from Closed to In Progress — ok on it"
    const match = text.match(
        /^Status changed from (.+?) to (Open|In Progress|Closed)(?:\s+—\s*(.*))?$/
    );

    if (!match) {
        return null;
    }

    return {
        status: match[2],
        note: match[3] ? match[3].trim() : null,
    };
}


function isStatusActivity(note) {
    return Boolean(getStatusFromText(note?.note_text));
}


function buildActivities(notes) {
    const activities = [];

    for (let i = 0; i < notes.length; i++) {
        const current = notes[i];

        // Keep ticket creation as its own activity.
        if (current.note_text === "Ticket created") {
            activities.push({
                id: `created-${current.id}`,
                type: "created",
                status: null,
                note: "Ticket created",
                created_at: current.created_at,
            });

            continue;
        }

        const statusInfo = getStatusFromText(current.note_text);

        if (statusInfo) {
            let noteText = statusInfo.note;

            // Old database records were created as two rows:
            // 1. Status changed...
            // 2. The user's note
            //
            // If they have the same timestamp, combine them.
            const next = notes[i + 1];

            if (
                !noteText &&
                next &&
                !isStatusActivity(next) &&
                next.note_text !== "Ticket created" &&
                next.created_at === current.created_at
            ) {
                noteText = next.note_text;
                i++;
            }

            activities.push({
                id: `update-${current.id}`,
                type: "update",
                status: statusInfo.status,
                note: noteText,
                created_at: current.created_at,
            });

            continue;
        }

        // Normal note.
        activities.push({
            id: `note-${current.id}`,
            type: "note",
            status: null,
            note: current.note_text,
            created_at: current.created_at,
        });
    }

    return activities;
}


function ActivityTimeline({ notes }) {
    if (!notes || notes.length === 0) {
        return (
            <div className="empty-activity">
                No activity yet.
            </div>
        );
    }

    const activities = buildActivities(notes);

    return (
        <div className="activity-timeline">

            {activities.map((activity) => (
                <div
                    className={`activity-item activity-${activity.type}`}
                    key={activity.id}
                >
                    <div className="activity-dot"></div>

                    <div className="activity-content">

                        {activity.type === "created" && (
                            <>
                                <div className="activity-label">
                                    Ticket Created
                                </div>

                                <p className="activity-text">
                                    Ticket created
                                </p>
                            </>
                        )}

                        {activity.type === "update" && (
                            <>
                                <div className="activity-label">
                                    Status: {activity.status}
                                </div>

                                {activity.note && (
                                    <p className="activity-text">
                                        {activity.note}
                                    </p>
                                )}
                            </>
                        )}

                        {activity.type === "note" && (
                            <>
                                <div className="activity-label">
                                    Note
                                </div>

                                <p className="activity-text">
                                    {activity.note}
                                </p>
                            </>
                        )}

                        <span className="activity-time">
                            {formatDate(activity.created_at)}
                        </span>

                    </div>
                </div>
            ))}

        </div>
    );
}

export default ActivityTimeline;

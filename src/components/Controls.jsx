
export default function ControlsPanel() {
    return (
        <div className="controls-container" style={styles.panel}>
            <button style={styles.button} >Move Back</button>
            <button style={styles.button} >Move to Mercury</button>
            <button style={styles.button} >Move to Venus</button>
        </div>
    );
}

const styles = {
    panel: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 1000,
    },
    button: {
        padding: '10px 15px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        cursor: 'pointer',
    },
};

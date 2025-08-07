import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function App() {
  const [texto, setTexto] = useState("");
  const [gerar, setGerar] = useState("");
  const qrRef = useRef();

  const handleGerar = () => {
    setGerar(texto);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🔳 Gerador de QR Code</h1>

        <input
          type="text"
          placeholder="Digite um link ou texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleGerar} style={styles.button}>
          Gerar QR Code
        </button>

        {gerar && (
          <div style={styles.qrContainer}>
            <div ref={qrRef} style={styles.qrBox}>
              <QRCodeCanvas value={gerar} size={256} bgColor="#fff" fgColor="#000" />
            </div>
            <p style={styles.info}>QR gerado para: <strong>{gerar}</strong></p>

            <button onClick={handleDownload} style={{ ...styles.button, marginTop: 10 }}>
              ⬇️ Baixar PNG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  container: {
    backgroundColor: "#1e1e2f",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 0 25px rgba(0,0,0,0.5)",
    textAlign: "center",
    width: "100%",
    maxWidth: "500px",
    color: "#fff",
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#ffffff",
  },
  input: {
    padding: "12px",
    width: "100%",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #555",
    marginBottom: "15px",
    backgroundColor: "#2b2b3c",
    color: "#fff",
  },
  button: {
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#00c3ff",
    color: "#000",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  qrContainer: {
    marginTop: "30px",
  },
  info: {
    marginTop: "10px",
    fontSize: "0.9rem",
    color: "#ccc",
  },
  qrBox: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "12px",
    display: "inline-block",
    boxShadow: "0 0 10px rgba(255,255,255,0.1)",
  },
};

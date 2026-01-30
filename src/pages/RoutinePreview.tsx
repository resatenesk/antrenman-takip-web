// src/pages/RoutinePreview.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { RoutineExportDto } from '../types/routine';
import '../styles/RoutinePreview.css'; // Tasarım dosyası
import html2canvas from 'html2canvas'; // En üstte importlar
import jsPDF from 'jspdf';
const exportToPdf = async () => {
    const element = document.getElementById('capture-area'); // Ekrandaki ID ile eşleşmeli
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("antrenman-rutini.pdf");
};
const RoutinePreview = () => {
    const { key } = useParams<{ key: string }>();
    const [routine, setRoutine] = useState<RoutineExportDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                // Kendi API adresini buraya yazmalısın
                const response = await axios.get(`http://localhost:5129/api/sharing/${key}`);
                setRoutine(response.data);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            } finally {
                setLoading(false);
            }
        };

        if (key) fetchRoutine();
    }, [key]);

    if (loading) return <div className="loading">Yükleniyor...</div>;
    if (!routine) return <div className="error">Rutin bulunamadı.</div>;

    return (
        <div className="container">
            <div id="capture-area" className="routine-card">
                <header>
                    <h1>{routine.routineName}</h1>
                    <p className="author">Hazırlayan: {routine.authorName}</p>
                </header>

                {routine.exercises.map((ex, idx) => (
                    <div key={idx} className="exercise-block">
                        <h3>{ex.exerciseName}</h3>
                        {ex.note && <p className="note">Note: {ex.note}</p>}
                        {ex.restTimeSeconds && <p className="rest">Rest: {Math.floor(ex.restTimeSeconds / 60)}:{(ex.restTimeSeconds % 60).toString().padStart(2, '0')}</p>}

                        <table className="set-table">
                            <thead>
                                <tr>
                                    <th>SET</th>
                                    <th>KG</th>
                                    <th>REPS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ex.sets.map((set, sIdx) => (
                                    <tr key={sIdx}>
                                        <td className={set.setType === 2 ? "warmup" : ""}>
                                            {set.setType === 2 ? "W" : set.order}
                                        </td>
                                        <td>{set.targetWeight || "-"}</td>
                                        <td>{set.minReps === set.maxReps ? set.minReps : `${set.minReps}-${set.maxReps}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
            <button className="download-btn" onClick={exportToPdf}>PDF Olarak İndir</button>
        </div>
    );
};

export default RoutinePreview;
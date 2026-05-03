import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionsByYear } from '../data/questions';
import { downloadPrintableQuiz } from '../services/pdfGenerator';

const PrintScreen = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [previewQuestions, setPreviewQuestions] = useState([]);

  const themes = ['Variety and Classification', 'Energy and Forces', 'Cycles', 'Systems', 'Personal Health'];
  
  const topics = {
    4: ['Living Things', 'Non-Living Things', 'Energy', 'Heat', 'Light', 'Sound', 'Magnets', 'Earth and Sun', 'Water', 'Personal Health', 'Systems'],
    5: ['Living Things', 'Adaptation', 'Energy', 'Light', 'Sound', 'Magnets', 'Life Cycles', 'Water', 'Personal Health', 'Plant Systems'],
    6: ['Classification', 'Forces', 'Energy', 'Machines', 'Solar System', 'Personal Health', 'Environment', 'Electrical Systems']
  };

  const generatePreview = () => {
    let filtered = questionsByYear[selectedYear] || [];
    
    if (selectedTheme) {
      filtered = filtered.filter(q => q.theme === selectedTheme);
    }
    if (selectedTopic) {
      filtered = filtered.filter(q => q.topic === selectedTopic);
    }
    
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setPreviewQuestions(shuffled.slice(0, 20));
  };

  const handleDownload = () => {
    if (previewQuestions.length === 0) {
      alert('Please generate a preview first!');
      return;
    }
    
    const title = `Science Quiz - Year ${selectedYear}${selectedTheme ? ' - ' + selectedTheme : ''}`;
    downloadPrintableQuiz(previewQuestions, title);
  };

  const style = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      color: 'white'
    },
    form: {
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '25px'
    },
    group: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px'
    },
    button: {
      flex: 1,
      padding: '12px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '14px'
    },
    buttonActive: {
      flex: 1,
      padding: '12px',
      border: '2px solid #F59E0B',
      borderRadius: '10px',
      background: '#F59E0B',
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '14px'
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '10px',
      border: '2px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      fontSize: '16px',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    preview: {
      marginTop: '20px',
      background: 'white',
      borderRadius: '15px',
      padding: '20px'
    }
  };

  return (
    <div style={style.container}>
      <div style={style.header}>
        <h2 style={{ fontSize: '28px' }}>📄 Printable Quiz Generator</h2>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          ← Home
        </button>
      </div>

      <div style={style.form}>
        <div style={style.group}>
          <label style={style.label}>Select Year</label>
          <div style={style.buttonGroup}>
            {[4, 5, 6].map(year => (
              <button
                key={year}
                style={selectedYear === year ? style.buttonActive : style.button}
                onClick={() => setSelectedYear(year)}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>

        {selectedYear && (
          <>
            <div style={style.group}>
              <label style={style.label}>Theme (Optional)</label>
              <select
                value={selectedTheme || ''}
                onChange={(e) => setSelectedTheme(e.target.value || null)}
                style={style.select}
              >
                <option value="">All Themes</option>
                {themes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>

            <div style={style.group}>
              <label style={style.label}>Topic (Optional)</label>
              <select
                value={selectedTopic || ''}
                onChange={(e) => setSelectedTopic(e.target.value || null)}
                style={style.select}
              >
                <option value="">All Topics</option>
                {topics[selectedYear]?.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div style={style.group}>
              <label style={{ ...style.label, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={includeAnswers}
                  onChange={(e) => setIncludeAnswers(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                Include Answer Sheet
              </label>
            </div>

            <button 
              onClick={generatePreview}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Generate Preview
            </button>
          </>
        )}
      </div>

      {previewQuestions.length > 0 && (
        <div style={style.preview}>
          <h3 style={{ color: '#4F46E5', marginBottom: '15px' }}>
            Quiz Preview ({previewQuestions.length} questions)
          </h3>
          <div>
            {previewQuestions.slice(0, 5).map((q, i) => (
              <div key={i} style={{ padding: '10px', borderBottom: '1px solid #E5E7EB' }}>
                <p style={{ fontWeight: 'bold', color: '#1F2937' }}>Q{i + 1}: {q.question}</p>
              </div>
            ))}
            {previewQuestions.length > 5 && (
              <p style={{ textAlign: 'center', color: '#6B7280', marginTop: '10px', fontStyle: 'italic' }}>
                ... and {previewQuestions.length - 5} more questions
              </p>
            )}
          </div>
          
          <button 
            onClick={handleDownload}
            style={{
              width: '100%',
              padding: '18px',
              border: 'none',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'inherit',
              marginTop: '20px'
            }}
          >
            Download Printable PDF 📥
          </button>
        </div>
      )}
    </div>
  );
};

export default PrintScreen;
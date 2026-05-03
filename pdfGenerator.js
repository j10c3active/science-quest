import jsPDF from 'jspdf';

export const generatePrintableQuiz = (questions, title, includeAnswers = false) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  
  let yPosition = 40;
  
  questions.forEach((question, index) => {
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`${index + 1}. ${question.question}`, 20, yPosition);
    yPosition += 10;
    
    doc.setFont(undefined, 'normal');
    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, optIndex) => {
      doc.text(`   ${letters[optIndex]}. ${option}`, 25, yPosition);
      yPosition += 7;
    });
    
    yPosition += 10;
  });
  
  if (includeAnswers) {
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Answer Sheet', 20, 20);
    
    yPosition = 35;
    const letters = ['A', 'B', 'C', 'D'];
    
    questions.forEach((question, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.text(
        `${index + 1}. ${letters[question.correctAnswer]}`,
        20,
        yPosition
      );
      yPosition += 10;
    });
  }
  
  return doc;
};

export const downloadPrintableQuiz = (questions, title) => {
  const doc = generatePrintableQuiz(questions, title, true);
  const filename = `science-quiz-${Date.now()}.pdf`;
  doc.save(filename);
};
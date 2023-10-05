interface SectionProps {
    title: string;
    content: string;
  }
  
  function SectionFile({ title, content }: SectionProps) {
    return (
      <>
        <h2>{title}</h2>
        <p>{content}</p>
        <hr className="show-space" />
      </>
    );
  }

  export default SectionFile;
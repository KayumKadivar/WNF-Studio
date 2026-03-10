const SectionHeading = ({ label, title, description, light = false }) => (
  <div className={light ? "text-white" : ""}>
    {label && <span className="label-text mb-3 block" style={light ? { color: 'rgba(255, 255, 255, 0.7)' } : {}}>{label}</span>}
    <h2 className="heading-lg">{title}</h2>
    {description && (
      <p className={`mt-4 leading-relaxed !text-lg`}>{description}</p>
    )}
  </div>
);

export default SectionHeading;

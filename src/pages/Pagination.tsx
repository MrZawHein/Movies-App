interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, total, onChange }: Props) => {
  return (
    <div className="pagination">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={page === i + 1 ? "active" : ""}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

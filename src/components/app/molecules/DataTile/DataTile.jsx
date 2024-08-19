import styles from "./DataTile.module.scss";

const data = [
  { value: 43, label: "Publications" },
  { value: 34, label: "Citations" },
  { value: 60, label: "H-Index" },
  { value: 12, label: "I-10 Index" }
];

const DataTile = () => (
  <div className={styles.dataTileContainer}>
    {data.map((item, index) => (
      <div key={index} className={styles.dataTile}>
        <h2 className={styles.value}>{item.value}</h2>
        <div className={styles.label}>{item.label}</div>
      </div>
    ))}
  </div>
);

export default DataTile;

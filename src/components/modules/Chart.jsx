import styles from "./Chart.module.css";
function Chart({ setChart }) {
  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        x
      </span>
      <div className={styles.chart}></div>
    </div>
  );
}

export default Chart;

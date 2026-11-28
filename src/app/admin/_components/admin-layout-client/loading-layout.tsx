import { Spinner } from "@/components/ui/spinner";

import styles from "./styles.module.css";

export function LoadingLayout() {
  return (
    <output className={styles.loading}>
      <Spinner aria-label="Loading admin layout" />
    </output>
  );
}

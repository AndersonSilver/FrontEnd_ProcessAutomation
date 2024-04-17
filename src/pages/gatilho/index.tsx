import React, { useContext } from "react";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Aside } from "../../components/Aside";
import { Gatilho } from "../../components/Gatilho";
import style from "./style.module.scss";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";


export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className={style.dashboardContainer}>
      <Gatilho />
      <div>
        <Header />
      </div>
      <div className={style.dashboardContainerCenter}>
        <div className={style.dashboardContainerCenterSection}>
          <Section />
        </div>
        <div className={style.dashboardContainerCenterAside}>
          <Aside />
        </div>
      </div>
    </div>
  );
}

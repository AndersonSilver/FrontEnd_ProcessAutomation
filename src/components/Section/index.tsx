import { useContext } from "react";
import style from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from 'next/router';

export function Section() {

  const router = useRouter();

  const buttons = [
    // { href: "", label: "Habilidade" },
    // { href: "", label: "Tabulações" },
    // { href: "", label: "Formulário" },
    { href: "/gatilho", label: "Gatilho" },
    // Add more buttons here
  ];

  return (
    <section className={style.sectionContainer}>
      <div className={style.sectionContent}>
        <div className={style.sectionContentFerramenta}>
          <h2>- Ferramentas -</h2>
        </div>
        <div className={style.sectionContentButton}>
          {buttons.map((button) => (
            <Link href={button.href} key={button.label}>
              <button
                className={`${style.button} ${
                  router.pathname === button.href ? style.buttonActive : ""
                }`}
              >
                {button.label}
              </button>
            </Link>
          ))}

        </div>
        <div className={style.sectionContentFerramenta}>
          <h2>- Deploy -</h2>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Deploy</button>
          </Link>

        </div>
        {/* <div className={style.sectionContentFerramenta}>
          <h2>- WebApp -</h2>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>WorkFlow</button>
          </Link>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Workflow Group</button>
          </Link>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Workflow G. Itens</button>
          </Link>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Workflow Product</button>
          </Link>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Workflow Step</button>
          </Link>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Workflow S. Form</button>
          </Link>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Workflow Form</button>
          </Link>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Workflow F. Group</button>
          </Link>
        </div>
        <div className={style.sectionContentButton}>
          <Link href={""}>
            <button className={style.button}>Workflow File</button>
          </Link>
        </div> */}
      </div>
    </section>
  );
}

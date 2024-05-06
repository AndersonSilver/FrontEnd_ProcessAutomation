import { useRouter } from 'next/router';
import style from "./styles.module.scss";
import Link from "next/link";

export function Section() {

  const router = useRouter();

  const gatilhoButtons = [
    { href: "/gatilho", label: "Gatilho" },
    // Add more buttons for "Gatilho" here
  ];

  const webAppButtons = [
    { href: "/webapp", label: "Login WebApp" },
    { href: "/workflow", label: "WorkFlow" },
    { href: "", label: "Workflow Group" },
    { href: "", label: "Workflow G. Itens" },
    { href: "", label: "Workflow Product" },
    { href: "", label: "Workflow Step" },
    { href: "", label: "Workflow S. Form" },
    { href: "", label: "Workflow Form" },
    { href: "", label: "Workflow F. Group" },
    { href: "", label: "Workflow File" },
    // Add more buttons for "WebApp" here
  ];

  return (
    <section className={style.sectionContainer}>
      <div className={style.sectionContent}>
        <div className={style.sectionContentFerramenta}>
          <h2>- Ferramentas -</h2>
        </div>
        <div className={style.sectionContentButton}>
          {gatilhoButtons.map((button) => (
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
          <h2>- WebApp -</h2>
        </div>
        <div className={style.sectionContentButton}>
          {webAppButtons.map((button) => (
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
      </div>
    </section>
  );
}
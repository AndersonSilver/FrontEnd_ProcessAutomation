import { useContext, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";
import Image from "next/image";
import logoImg from "../../public/tech.png";
import logoTechOne from "../../public/techOne.png";
import styles from "../../styles/home.module.scss";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [slug, setInstance] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [rememberPassword, setRememberPassword] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (slug === "") {
      toast.warn("Preencha o dominio!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    if (email === "") {
      toast.warn("Preencha o email!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    if (password === "") {
      toast.warn("Preencha a senha!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    setLoading(true);

    let data = {
      slug,
      email,
      password,
    };

    signIn(data);

    localStorage.setItem("Slug", slug);
    localStorage.setItem("Email", email);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Tech Forms - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.container}>
          <div className={styles.containerTop}>
            <div className={styles.containerTwo}>
              <div className={styles.titulo}>
                <h3>Bem vindo de volta !</h3>
                <br />
                <h4>Faça login na ferramenta.</h4>
              </div>
              <div className={styles.containerLogoOne}>
                <Image
                  className={styles.logoTechOne}
                  src={logoTechOne}
                  alt="Logo Tech One"
                  priority
                />
              </div>
            </div>
          </div>
          <div className={styles.containerPictury}>
            <div className={styles.containerLogo}>
              <Image
                className={styles.logoTech}
                src={logoImg}
                alt="Logo Tech"
                priority
              />
            </div>
          </div>
          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <h4>Domínio da empresa</h4>
              <br />
              <Input
                placeholder="Domínio da empresa"
                type="text"
                value={slug}
                onChange={(e) => setInstance(e.target.value)}
              />

              <h4>Email</h4>
              <br />
              <Input
                placeholder="E-mail"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <h4>Senha</h4>
              <br />
              <Input
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />

              <label>
                <input
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                />
                Lembrar senha
              </label>
              <br />

              <Button type="submit" loading={loading}>
                Entrar
              </Button>
            </form>
          </div>
        </div>
        <p>© 2024 Process Automation - Tech4humans.</p>
        <a>v1.0.0</a>
      </div>
    </>
  );
}

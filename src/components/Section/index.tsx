import { useRouter } from 'next/router'
import style from './styles.module.scss'
import Link from 'next/link'

export function Section() {
  const router = useRouter()

  const webAppEsteiras = [
    { href: '/workflow', label: 'WorkFlow' },
    { href: '', label: 'Workflow Group' },
    { href: '', label: 'Workflow Group Itens' },
    { href: '', label: 'Workflow Product' },
    { href: '', label: 'Workflow Step' },
    { href: '', label: 'Workflow Step Form' },
    { href: '', label: 'Workflow Form' },
    { href: '', label: 'Workflow Form Group' },
    { href: '', label: 'Workflow File' },
    { href: '', label: 'Workflow Form Field' },
    { href: '', label: 'Workflow History' },
  ]
  const webAppClient = [
    { href: '', label: 'Client Product Request' },
    { href: '', label: 'Client File' },
    { href: '', label: 'Client Function' },
    { href: '', label: 'Client Services' },
  ]

  return (
    <section className={style.sectionContainer}>
      <div className={style.sectionContentEsteiras}>
        <div className={style.sectionContentButton}>
          <div className={style.sectionContentFerramenta}>
            <h2>Esteiras</h2>
          </div>
          {webAppEsteiras.map((button) => (
            <Link href={button.href} key={button.label}>
              <button
                className={`${style.button} ${
                  router.pathname === button.href ? style.buttonActive : ''
                }`}
              >
                {button.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div className={style.sectionContentClient}>
        <div className={style.sectionContentButton}>
          <div className={style.sectionContentFerramenta}>
            <h2>Client</h2>
          </div>
          {webAppClient.map((button) => (
            <Link href={button.href} key={button.label}>
              <button
                className={`${style.button} ${
                  router.pathname === button.href ? style.buttonActive : ''
                }`}
              >
                {button.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

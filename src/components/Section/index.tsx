import { Link, useLocation } from 'react-router-dom'
import style from './styles.module.scss'

export function Section() {
  const { pathname } = useLocation()

  const webAppEsteiras = [
    { href: '/Workflow', label: 'WorkFlow' },
    { href: '/WorkflowGroup', label: 'Workflow Group' },
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
    { href: '', label: 'Tech Data' },
  ]

  return (
    <section className={style.sectionContainer}>
      <div className={style.sectionContentEsteiras}>
        <div className={style.sectionContentButton}>
          <div className={style.sectionContentFerramenta}>
            <h2>Esteiras</h2>
          </div>
          {webAppEsteiras.map((button) => (
            <Link to={button.href} key={button.label}>
              <button
                className={`${style.button} ${
                  pathname === button.href ? style.buttonActive : ''
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
            <Link to={button.href} key={button.label}>
              <button
                className={`${style.button} ${
                  pathname === button.href ? style.buttonActive : ''
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

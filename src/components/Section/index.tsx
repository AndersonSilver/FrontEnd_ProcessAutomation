import { Link, useLocation } from 'react-router-dom'
import style from './styles.module.scss'
import Button from '@material-ui/core/Button'

export function Section() {
  const { pathname } = useLocation()

  const webAppEsteiras = [
    { href: '/Workflow', label: 'WorkFlow' },
    { href: '/WorkflowGroup', label: 'Workflow Group' },
    { href: '/WorkflowGroupItem', label: 'Workflow G. Itens' },
    { href: '/WorkflowProduct', label: 'Workflow Product' },
    { href: '/WorkflowStep', label: 'Workflow Step' },
    { href: '/WorkflowStepForm', label: 'Workflow S. Form' },
    { href: '/WorkflowForm', label: 'Workflow Form' },
    { href: '/WorkflowFormGroup', label: 'Workflow F. Group' },
    // { href: '', label: 'Workflow File' },
  ]
  const webAppClient = [
    { href: '/ClientProductRequest', label: 'Listagem CPR' },
    { href: '/ClientProductRequestId', label: 'Editar CPR' },
    { href: '/ClientFunction', label: 'Listagem CF' },
    { href: '/ClientFunctionEdit', label: 'Editar CF' },
    { href: '/ClientService', label: 'Client Services' },
    { href: '/TechData', label: 'Tech Data' },
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
              <Button
                className={`${style.button} ${
                  pathname === button.href ? style.buttonActive : ''
                }`}
                color='primary'
                variant='outlined'
              >
                {button.label}
              </Button>
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
              <Button
                className={`${style.button} ${
                  pathname === button.href ? style.buttonActive : ''
                }`}
              >
                {button.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

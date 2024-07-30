import { Link, useLocation } from 'react-router-dom'
import style from './styles.module.scss'
import Button from '@mui/material/Button'

export function Section() {
  const { pathname } = useLocation()

  const webAppEsteiras = [
    { href: '/Workflow', label: 'WorkFlow' },
    { href: '/WorkflowGroup', label: 'Group' },
    { href: '/WorkflowGroupItem', label: 'Group Itens' },
    { href: '/WorkflowProduct', label: 'Product' },
    { href: '/WorkflowStep', label: 'Step' },
    { href: '/WorkflowStepForm', label: 'Step Form' },
    { href: '/WorkflowForm', label: 'Form' },
    { href: '/WorkflowFormGroup', label: 'Form Group' },
    // { href: '', label: 'Workflow File' },
  ]
  const webAppClient = [
    { href: '/ClientProductRequest', label: 'Client P. Request' },
    { href: '/ClientProductRequestId', label: 'Editar CPR' },
    { href: '/ClientFunction', label: 'Client Function' },
    { href: '/ClientFunctionEdit', label: 'Editar CF' },
    { href: '/ClientService', label: 'Client Services' },
    { href: '/TechData', label: 'Tech Data' },
  ]

  const webAppAuthentication = [
    { href: '/UserAccount', label: 'User Account' },
    { href: '/UserAccountType', label: 'User Account Type' },
  ]

  return (
    <section className={style.sectionContainer}>
      <div className={style.sectionContentEsteiras}>
        <div className={style.sectionContentButton}>
          <div className={style.sectionContentFerramenta}>
            <h2>Workflow</h2>
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
            <h2>Autenticação</h2>
          </div>
          {webAppAuthentication.map((button) => (
            <Link to={button.href} key={button.label}>
              <Button
                className={`${style.button} ${
                  pathname === button.href ? style.buttonActive : ''
                }`}
                color='primary'
                variant='outlined'
                disabled={
                  button.label === 'SSO' || button.label === 'Access Session'
                }
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

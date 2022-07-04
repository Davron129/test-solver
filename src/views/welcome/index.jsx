
import Styles from './Welcome.module.css'

const Welcome = () => {
    return (
      <div className={Styles.welcome__wrapper}>
        <div className={Styles.welcome__card}>
          <div className={Styles.body}>
            <span>Test Ishlash</span>
            <span>Natijalarim</span>
          </div>
        </div>
      </div>
    )
}

export default Welcome
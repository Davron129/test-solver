import Styles from './Test.module.css'

const Result = ({ trueCount }) => {
    return (
        <div className={Styles.modal__wrapper}>
            <div className={Styles.modal__body}>
                <div className={Styles.content}>
                    <div>
                        <span className={Styles.label}>To'g'ri</span>
                        <span className={Styles.value}>{ trueCount }</span>
                    </div>
                    <div>
                        <span className={Styles.label}>Savollar soni</span>
                        <span className={Styles.value}>25</span>
                    </div>
                    <button onClick={() => window.location.reload() }>Boshqa Test</button>
                </div>
            </div>
        </div>
    )
}

export default Result;
'use client'
import { useFormStatus } from "react-dom";
import styles from './pending.module.css'
import Image from "next/image";



export default function Pending() {
    const { pending, data, action, method } = useFormStatus()

    return (
        <div className={styles.pending} aria-disabled={pending}>
            {pending ?
                <Image src='/setting.png' width={20} height={20} alt="" className={styles.loader} /> : ''}
        </div>);
}
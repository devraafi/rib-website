import { Collapse } from 'antd';
import React from 'react';
const { Panel } = Collapse;
export function OV() {
    return (
        <ol className='px-3 intructions'>
            <li className='firasans'>Klik <strong>Bayar</strong> dan pastikan nomor handphone yang Anda masukkan pada data diri sudah terdaftar di OVO</li>
            <li className='firasans'>Anda akan mendapatkan push notification melalui aplikasi OVO untuk melakukan pembayaran</li>
            <li className='firasans'>Pastikan Anda menyelesaikan pembayaran di aplikasi OVO dalam jangka waktu paling lama <strong>30 detik</strong></li>
        </ol>
    )
}

export function SP() {
    return <Collapse expandIconPosition='right' defaultActiveKey={'1'} ghost>
        <Panel className='firasans' header="ShopeePay" key="1">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka Aplikasi <b>Shopee</b></li>
                <li className='firasans'>Pilih menu <b>“Saya”</b> dan pilih <b>ShopeePay</b></li>
                <li className='firasans'>Pilih <b>Scan</b> dan lakukan scan pada barcode pembayaran</li>
                <li className='firasans'>Pilih <b>Bayar Sekarang</b></li>
                <li className='firasans'>Tunggu hingga proses pembayaran berhasil</li>
                <li className='firasans'>Transaksi Anda akan otomatis terkonfirmasi di sistem</li>
            </ol>
        </Panel>
        <Panel className='firasans' header="BCA Mobile" key="2">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka Aplikasi <b>BCA mobile Anda</b></li>
                <li className='firasans'>Pilih menu <b>QR</b></li>
                <li className='firasans'>Lakukan <b>Scan</b> pada barcode pembayaran</li>
                <li className='firasans'>Pilih konfirmasi pembayaran dengan <b>tekan tombol “OK”</b></li>
                <li className='firasans'><b>Masukkan pin</b> BCA mobile Anda</li>
                <li className='firasans'>Tunggu hingga proses pembayaran berhasil</li>
                <li className='firasans'>Transaksi Anda akan otomatis terkonfirmasi di sistem</li>
            </ol>
        </Panel>
        <Panel className='firasans' header="CIMB GoMobile" key="3">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka Aplikasi <b>GoMobile Anda</b></li>
                <li className='firasans'>Pilih menu <b>QR</b></li>
                <li className='firasans'>Lakukan <b>Scan</b> pada barcode pembayaran</li>
                <li className='firasans'>Pilih <b>Konfirmasi</b> dan <b>masukkan pin GoMobile Anda</b></li>
                <li className='firasans'>Tunggu hingga proses pembayaran berhasil</li>
                <li className='firasans'>Transaksi Anda akan otomatis terkonfirmasi di sistem</li>
            </ol>
        </Panel>
        <Panel className='firasans' header="LinkAja" key="4">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka Aplikasi <b>LinkAja</b></li>
                <li className='firasans'>Pilih <b>Bayar</b> pada menu LinkAja</li>
                <li className='firasans'>Lakukan <b>Scan</b> pada barcode pembayaran</li>
                <li className='firasans'>Pilih <b>Konfirmasi</b> dan <b>masukkan pin LinkAja Anda</b></li>
                <li className='firasans'>Tunggu hingga proses pembayaran berhasil</li>
                <li className='firasans'>Transaksi Anda akan otomatis terkonfirmasi di sistem</li>
            </ol>
        </Panel>
        <Panel className='firasans' header="Gopay" key="5">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka Aplikasi <b>Gopay</b></li>
                <li className='firasans'>Pilih <b>Bayar</b> pada menu Gojek</li>
                <li className='firasans'>Lakukan <b>Scan</b> pada barcode pembayaran</li>
                <li className='firasans'>Pilih <b>Metode pembayaran Gopay</b></li>
                <li className='firasans'>Pilih <b>Bayar</b> dan <b>masukkan pin Gopay Anda</b></li>
                <li className='firasans'>Tunggu hingga proses pembayaran berhasil</li>
                <li className='firasans'>Transaksi Anda akan otomatis terkonfirmasi di sistem</li>
            </ol>
        </Panel>
        <Panel className='firasans' header="DANA" key="6">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka Aplikasi <b>DANA</b></li>
                <li className='firasans'>Pilih <b>Pindai</b> pada menu DANA</li>
                <li className='firasans'>Lakukan <b>Scan</b> pada barcode pembayaran</li>
                <li className='firasans'>Pilih <b>Bayar menggunakan saldo DANA</b> dan <b>masukkan pin DANA Anda</b></li>
                <li className='firasans'>Tunggu hingga proses pembayaran berhasil</li>
                <li className='firasans'>Transaksi Anda akan otomatis terkonfirmasi di sistem</li>
            </ol>
        </Panel>
        <Panel className='firasans' header="OVO" key="6">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka Aplikasi <b>OVO</b></li>
                <li className='firasans'>Pilih <b>Scan</b> pada menu OVO</li>
                <li className='firasans'>Lakukan <b>Scan</b> pada barcode pembayaran</li>
                <li className='firasans'>Pilih <b>Bayar</b> dan <b>masukkan pin OVO Anda</b></li>
                <li className='firasans'>Tunggu hingga proses pembayaran berhasil</li>
                <li className='firasans'>Transaksi Anda akan otomatis terkonfirmasi di sistem</li>
            </ol>
        </Panel>
    </Collapse>
}
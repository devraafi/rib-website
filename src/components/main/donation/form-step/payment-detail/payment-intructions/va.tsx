import { Collapse } from "antd";
import React from "react";
const { Panel } = Collapse;
export function B1() {
    return <Collapse expandIconPosition='right' defaultActiveKey={'1'} ghost>
        <Panel className='firasans' header="Internet Banking" key="1">
            <ol className='px-3 firasans'>
                <li className='firasans'>Login ke <b>Internet Banking</b></li>
                <li className='firasans'>Pilih menu <b>Transfer ke Bank Lain Online</b></li>
                <li className='firasans'>Pilih bank <b>tujuan Bank CIMB Niaga</b> (kode bank: 022)</li>
                <li className='firasans'>Masukkan <b>nomor virtual account</b> 11990XXXXXXXXXXX</li>
                <li className='firasans'>Masukkan <b>jumlah pembayaran</b> sesuai tagihan</li>
                <li className='firasans'>Nomor, nama virtual account, dan jumlah billing akan <b>ditampilkan</b> pada layar</li>
                <li className='firasans'>Ikuti <b>instruksi</b> untuk menyelesaikan transaksi</li>
                <li className='firasans'><b>Konfirmasi</b> pembayaran ditampilkan pada layar</li>
            </ol>
        </Panel>
        <Panel header="ATM CIMB" key="2">
            <ol className='px-3 firasans'>
                <li className='firasans'>Masukkan kartu ATM dan PIN kartu CIMB Anda</li>
                <li className='firasans'>Pilih <b>Menu Transfer {'>'} Rekening CIMB Niaga / Rekening Ponsel Lain {'>'} Rekening CIMB Niaga Lain</b></li>
                <li className='firasans'>Masukkan <b>jumlah pembayaran</b> sesuai tagihan</li>
                <li className='firasans'>Masukkan <b>kode virtual account</b> pada kolom rekening penerima</li>
                <li className='firasans'>Ikuti <b>instruksi</b> untuk menyelesaikan transaks</li>
            </ol>
        </Panel>
        <Panel header="Go Mobile" key="3">
            <ol className='px-3 firasans'>
                <li className='firasans'>Login ke <b>Go-Mobile</b></li>
                <li className='firasans'>Pilih menu <b>Transfer {'>'} Rekening Ponsel / CIMB Niaga</b></li>
                <li className='firasans'>Pilih <b>rekening sumber anda:</b> CASA atau Rekening Ponsel</li>
                <li className='firasans'>Pilih <b>rekening tujuan:</b> CASA</li>
                <li className='firasans'>Masukkan <b>kode virtual account</b> pada kolom rekening penerima</li>
                <li className='firasans'>Masukkan <b>jumlah pembayaran</b> sesuai tagihan</li>
                <li className='firasans'>Ikuti <b>instruksi</b> untuk menyelesaikan transaks</li>
            </ol>
        </Panel>
        <Panel header="CIMB Clicks" key="4">
            <ol className='px-3 firasans'>
                <li className='firasans'>Login ke <b>CIMB Clicks</b></li>
                <li className='firasans'>Pilih menu <b>Bayar Tagihan / Pay Bills</b></li>
                <li className='firasans'>Pilih <b>Rekening Sumber / Source Account dan Jenis Pembayaran / Payment Type {'>'} Virtual Account</b></li>
                <li className="firasans">Masukkan <b>nomor virtual account 11990XXXXXXXXXXX</b></li>
                <li className="firasans">Nomor, nama virtual account, dan jumlah billing akan <b>ditampilkan</b> pada layar</li>
                <li className="firasans">Masukkan <b>6 digit mPIN</b> dan tekan tombol Submit</li>
                <li className="firasans"><b>Konfirmasi pembayaran</b> ditampilkan pada layar</li>
            </ol>
        </Panel>
        <Panel header="ATM Bersama/Prima" key="5">
            <ol className='px-3 firasans'>
                <li className='firasans'>ATM Bersama/Prima <b>Transaksi Lainnya</b></li>
                <li className='firasans'>Pilih <b>Transfer</b></li>
                <li className='firasans'>Pilih <b>Antar Bank Online</b></li>
                <li className="firasans">Masukkan nomor <b>Virtual Account</b> (kode bank 022 dan kode Virtual Account)</li>
                <li className="firasans">Masukkan <b>jumlah tagihan</b> yang akan Anda bayar <b>secara lengkap</b>. Pembayaran dengan jumlah yang tidak sesuai akan otomatis ditolak</li>
                <li className='firasans'>Pada halaman konfirmasi transfer akan muncul jumlah yang dibayarkan & nomor rekening tujuan. Jika informasinya <b>telah sesuai</b> tekan <b>Benar</b></li>
            </ol>
        </Panel>
    </Collapse>
}

export function VA() {
    return (
        <Collapse expandIconPosition='right' defaultActiveKey={'1'} ghost>
            <Panel className='firasans' header="ATM Maybank" key="1">
                <ol className='px-3 firasans'>
                    <li className='firasans'>Masukkan kartu <b>ATM Maybank & PIN</b></li>
                    <li className='firasans'>Pilih menu <b>Pembayaran/Top Up Pulsa</b></li>
                    <li className='firasans'>Pilih menu <b>Virtual Account</b></li>
                    <li className='firasans'>Masukkan nomor 7828XXXXXXXXXXXX <b>(16 angka kode Virtual Account)</b> dan <b>Jumlah Nominal Pembayaran</b></li>
                    <li className='firasans'><b>Konfirmasi</b> Validasi Pembayaran <b>(pastikan Nominal dan informasi sesuai)</b></li>
                    <li className='firasans'><b>Simpan struk</b> transaksi sebagai bukti pembayaran</li>
                </ol>
            </Panel>
            <Panel className='firasans' header="Internet Banking" key="2">
                <ol className='px-3 firasans'>
                    <li className='firasans'><b>Login</b> ke website Maybank Personal Internet Banking (M2U)</li>
                    <li className="firasans">Di halaman <b>Transfer</b></li>
                    <li className="firasans">Pilih <b>Maybank Virtual Account</b></li>
                    <li className="firasans">Pilih <b>Rekening Sumber Dana</b>, masukkan <b>nomor virtual account</b> dan <b>jumlah</b> yang harus dibayar</li>
                    <li className="firasans">Akan muncu <b>layar konfirmasi</b>, masukkan SMS token <b>(TAC)</b></li>
                </ol>
            </Panel>
            <Panel className='firasans' header="ATM Prima" key="3">
                <ol className='px-3 firasans'>
                    <li className="firasans">Pada Menu utama pilih <b>Transaksi Lainnya</b></li>
                    <li className="firasans">Pilih <b>Transfer</b></li>
                    <li className="firasans">Pilih <b>Rek Bank Lain</b></li>
                    <li className="firasans">Masukkan kode 016 untuk MAYBANK lalu tekan Benar</li>
                    <li className="firasans">Masukkan <b>jumlah tagihan</b> yang akan Anda bayar secara lengkap</li>
                    <li className="firasans">Masukkan 7828XXXXXXXXXXXX <b>(16 angka kode Virtual Account)</b> lalu tekan Benar</li>
                    <li className="firasans">Akan muncul <b>rincian pembayaran</b> Anda. Jika sudah benar, klik <b>“Ya”</b> untuk melanjutkan</li>
                </ol>
            </Panel>
        </Collapse>
    )
}

export function S1() {
    return <Collapse expandIconPosition='right' defaultActiveKey={'1'} ghost>
        <Panel className='firasans' header="ATM Bersama" key="1">
            <ol className='px-3 firasans'>
                <li className='firasans'>Pada <b>Menu utama</b>, pilih <b>Transaksi Lainnya</b></li>
                <li className='firasans'>Pilih <b>Transfer</b></li>
                <li className='firasans'>Pilih ke <b>Rek Bank Lain</b></li>
                <li className='firasans'>Masukkan <b>kode 532</b> untuk <b>Bank Sahabat Sampoerna</b> lalu <b>tekan Benar</b></li>
                <li className='firasans'>Masukkan <b>jumlah tagihan</b> yang akan Anda bayar <b>secara lengkap</b></li>
                <li className='firasans'>Masukkan <b>16 kode virtual account</b> pembayaran lalu <b>tekan Benar</b></li>
                <li className='firasans'>Masukkan <b>Nominal Pembayaran</b> lalu <b>tekan Benar</b></li>
                <li className='firasans'>Akan muncul <b>rincian pembayaran</b> Anda. Jika sudah benar, klik <b>"Ya"</b> untuk melanjutkan</li>
            </ol>
        </Panel>
        <Panel header="I-Banking Sampoerna" key="2">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka website Internet Banking Sahabat Sampoerna: <a href="https://ibank.banksampoerna.co.id" target="_blank">https://ibank.banksampoerna.co.id</a></li>
                <li className='firasans'>Silahkan <b>Login</b> menggunakan akun yang telah terdaftar</li>
                <li className='firasans'>Pada <b>Menu Utama</b>, pilih <b>Transfer Dana</b></li>
                <li className='firasans'>Pilih <b>Transfer ke Rekening Bank Sahabat Sampoerna</b></li>
                <li className='firasans'>Masukkan <b>16 angka kode Virtual Account</b></li>
                <li className='firasans'>Masukkan <b>jumlah pembayaran sesuai</b> tagihan</li>
                <li className='firasans'>Muncul <b>Konfirmasi Pembayaran</b></li>
                <li className='firasans'>Masukkan <b>otentikasi transaksi/token I-Banking</b></li>
                <li className='firasans'>Transaksi selesai</li>
            </ol>
        </Panel>
        <Panel header="M-Banking Sampoerna" key="3">
            <ol className='px-3 firasans'>
                <li className='firasans'>Buka aplikasi Mobile Banking Sampoerna pada smartphone Anda</li>
                <li className='firasans'>Silahkan <b>Login</b> menggunakan akun yang telah terdafta</li>
                <li className='firasans'>Pada <b>Menu Utama</b>, pilih <b>Transfer Dana</b></li>
                <li className='firasans'>Pilih <b>Transfer ke Rekening Bank Sahabat Sampoerna</b></li>
                <li className='firasans'>Masukkan <b>16 angka kode Virtual Account</b></li>
                <li className='firasans'>Masukkan <b>jumlah pembayaran sesuai</b> tagihan</li>
                <li className='firasans'>Muncul <b>Konfirmasi Pembayaran</b></li>
                <li className='firasans'>Masukkan <b>otentikasi transaksi/token I-Banking</b></li>
                <li className='firasans'>Transaksi selesai</li>
            </ol>
        </Panel>
    </Collapse>
}



export function A1() {
    return <Collapse expandIconPosition='right' defaultActiveKey={'1'} ghost>
        <Panel className='firasans' header="ATM Prima" key="1">
            <ol className='px-3 firasans'>
                <li className='firasans'>Masukkan <b>Pin</b></li>
                <li className='firasans'>Pilih menu <b>Transaksi Lainnya</b></li>
                <li className='firasans'>Pilih menu <b>Ke Rekening Bank Lain</b></li>
                <li className='firasans'>Masukkan kode sandi ATM Bersama <b>(016 - Maybank)</b> kemudian tekan Benar</li>
                <li className='firasans'>Masukkan nomor <b>Virtual Account</b> yang tertera pada halaman konfirmasi dan tekan <b>Benar</b></li>
                <li className='firasans'>Masukkan <b>jumlah pembayaran sesuai</b> dengan yang ditagihkan dalam halaman konfirmasi</li>
                <li className='firasans'>Pilih <b>Benar</b> untuk menyetujui transaksi tersebut</li>
            </ol>
        </Panel>
        <Panel header="ATM Bersama" key="2">
            <ol className='px-3 firasans'>
                <li className='firasans'>Masukkan <b>Pin</b></li>
                <li className='firasans'>Pilih menu <b>Transaksi Lainnya</b></li>
                <li className='firasans'>Pilih menu <b>Ke Rekening Bank Lain</b></li>
                <li className='firasans'>Masukkan kode sandi ATM Bersama <b>(016 - Maybank)</b> kemudian tekan Benar</li>
                <li className='firasans'>Masukkan nomor <b>Virtual Account</b> yang tertera pada halaman konfirmasi dan tekan <b>Benar</b></li>
                <li className='firasans'>Masukkan <b>jumlah pembayaran sesuai</b> dengan yang ditagihkan dalam halaman konfirmasi</li>
                <li className='firasans'>Pilih <b>Benar</b> untuk menyetujui transaksi tersebut</li>
            </ol>
        </Panel>
    </Collapse>
}
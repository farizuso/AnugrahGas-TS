export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Todo{
    id: number;
    name: string;
}
export interface TodoWithMethod extends Todo {
    _method: string;
}

export interface Produk{
    id: number;
    no_botol: string;
    nama_produk: string;
    harga: string;
    stok: string;
    deskripsi: string;
}

export interface Rekap{
    id: number;
    id_botol: number;
    nama_pelanggan: string;
    alamat: string;
    tgl_keluar: Date;
    tgl_kembali: Date;
    tgl_masuk_pabrik: Date;
    keterangan: string;
    produk : Produk
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: {
        success: string;
        error: string;
    };
    produks : Produk[]
};

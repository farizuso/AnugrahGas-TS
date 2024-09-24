import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Rekap, Produk, PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Calendar } from "@/Components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EditRekap {
    rekapedit: Rekap;
}
const Edit = ({ rekapedit }: EditRekap) => {
    const [open, setOpen] = useState(false);
    const { put, data, setData, processing, errors } = useForm({
        id_botol: rekapedit.id_botol,
        nama_pelanggan: rekapedit.nama_pelanggan,
        alamat: rekapedit.alamat,
        tgl_keluar: rekapedit.tgl_keluar,
        tgl_kembali: rekapedit.tgl_kembali,
        tgl_masuk_pabrik: rekapedit.tgl_masuk_pabrik,
        keterangan: rekapedit.keterangan,
        produk_id: rekapedit.produk?.id,
    });

    // Handle changes in date fields
    const handleDateSelect = (field: any, date: any) => {
        if (date) {
            // Set the time to noon to avoid timezone issues
            const adjustedDate = new Date(date);
            adjustedDate.setHours(12, 0, 0, 0);
            setData({
                ...data,
                [field]: adjustedDate.toISOString().split("T")[0],
            });
        } else {
            setData({ ...data, [field]: "" });
        }
    };

    useEffect(() => {
        setData({
            ...data,
            id_botol: rekapedit.id_botol,
            nama_pelanggan: rekapedit.nama_pelanggan,
            alamat: rekapedit.alamat,
            tgl_keluar: rekapedit.tgl_keluar,
            tgl_kembali: rekapedit.tgl_kembali,
            tgl_masuk_pabrik: rekapedit.tgl_masuk_pabrik,
            keterangan: rekapedit.keterangan,
            produk_id: rekapedit.produk?.id,
        });
    }, [rekapedit]);
    console.log(rekapedit);

    const submit = (e: any) => {
        e.preventDefault();
        put(route("admin.rekap.update", [rekapedit]));
    };

    const { produks } = usePage<PageProps>().props;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="blue" onClick={() => setOpen(true)}>
                    <BsPencilSquare />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Edit Rekap</DialogTitle>
                <DialogDescription>
                    Edit Rekap. Klik Simpan jika sudah selesai.
                </DialogDescription>
                <div className="space-y-4">
                    <div className="space-y-1">
                    <label htmlFor="produk_id">No botol</label>
                                    <select
                                        name="produk_id"
                                        id="produk_id"
                                        value={data.produk_id}
                                        onChange={(e) => setData('produk_id',Number(e.target.value))}
                                    >
                                        {produks.map((produk, i) => (
                                            <option key={i} value={produk.id}>
                                                {produk.no_botol}
                                            </option>
                                        ))}
                                    </select>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="nama_pelanggan">Nama Pelanggan</Label>
                        <Input
                            id="nama_pelanggan"
                            type="text"
                            name="nama_pelanggan"
                            onChange={(e) =>
                                setData("nama_pelanggan", e.target.value)
                            }
                            value={data.nama_pelanggan}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            id="alamat"
                            type="text"
                            name="alamat"
                            onChange={(e) => setData("alamat", e.target.value)}
                            value={data.alamat}
                        />
                    </div>

                    {/* Tanggal Keluar */}
                    <div className="space-y-1">
                        <Label htmlFor="tgl_keluar">Tanggal Keluar</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !data.tgl_keluar &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    {data.tgl_keluar
                                        ? format(
                                              new Date(data.tgl_keluar),
                                              "yyyy-MM-dd"
                                          )
                                        : "Pilih Tanggal"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={
                                        data.tgl_keluar
                                            ? new Date(data.tgl_keluar)
                                            : undefined
                                    }
                                    onSelect={(date) =>
                                        handleDateSelect("tgl_keluar", date)
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Tanggal Kembali */}
                    <div className="space-y-1">
                        <Label htmlFor="tgl_kembali">Tanggal Kembali</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !data.tgl_kembali &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    {data.tgl_kembali
                                        ? format(
                                              new Date(data.tgl_kembali),
                                              "yyyy-MM-dd"
                                          )
                                        : "Pilih Tanggal"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={
                                        data.tgl_kembali
                                            ? new Date(data.tgl_kembali)
                                            : undefined
                                    }
                                    onSelect={(date) =>
                                        handleDateSelect("tgl_kembali", date)
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Tanggal Masuk Pabrik */}
                    <div className="space-y-1">
                        <Label htmlFor="tgl_masuk_pabrik">
                            Tanggal Masuk Pabrik
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !data.tgl_masuk_pabrik &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    {data.tgl_masuk_pabrik
                                        ? format(
                                              new Date(data.tgl_masuk_pabrik),
                                              "yyyy-MM-dd"
                                          )
                                        : "Pilih Tanggal"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={
                                        data.tgl_masuk_pabrik
                                            ? new Date(data.tgl_masuk_pabrik)
                                            : undefined
                                    }
                                    onSelect={(date) =>
                                        handleDateSelect(
                                            "tgl_masuk_pabrik",
                                            date
                                        )
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Keterangan */}
                    <div className="space-y-1">
                        <Label htmlFor="keterangan">Keterangan</Label>
                        <Input
                            id="keterangan"
                            type="text"
                            name="keterangan"
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                            value={data.keterangan}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={processing}
                        onClick={submit}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Edit;

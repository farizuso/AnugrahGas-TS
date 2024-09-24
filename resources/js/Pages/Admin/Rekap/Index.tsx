import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs";

import { PageProps, Produk, Rekap } from '@/types';
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import * as React from "react";
import { DataTable } from "@/Components/DataTable";
import { rekapColumns } from "./rekapColumn";


interface RekapProps {
    posts: Rekap[];
}

const Index = ({ posts }: RekapProps) => {
    const flash = usePage<PageProps>().props.flash;
    console.log(flash);
    const [date, setDate] = React.useState<Date>();
    const { delete: destroy, data, setData, post, processing, errors, reset } = useForm({
        nama_pelanggan: "",
        alamat: "",
        tgl_keluar: "",
        tgl_kembali: "",
        tgl_masuk_pabrik: "",
        keterangan: "",
        produk_id: "",
    });
    const { produks } = usePage<PageProps>().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.rekap.store"), {
            onSuccess: () => reset(),
        });
    };

    const handleDateSelect = (field:any, date:any) => {
        if (date) {
            // Set the time to noon to avoid timezone issues
            const adjustedDate = new Date(date);
            adjustedDate.setHours(12, 0, 0, 0);
            setData({ ...data, [field]: adjustedDate.toISOString().split('T')[0] });
        } else {
            setData({ ...data, [field]: "" });
        }
    };

    return (
        <AdminLayout>
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Data Table</TabsTrigger>
                    <TabsTrigger value="password">Tambah Data</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <DataTable data={posts} columns={rekapColumns} />
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Tambah Data Rekap</CardTitle>
                                <CardDescription>
                                    Masukkan data rekap.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="produk_id">No botol</label>
                                    <select
                                        name="produk_id"
                                        id="produk_id"
                                        value={data.produk_id}
                                        onChange={(e) => setData('produk_id', e.target.value)}
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
                                        onChange={(e) => setData("nama_pelanggan", e.target.value)}
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
                                <div className="space-y-1">
                                    <Label htmlFor="tgl_keluar">Tanggal Keluar</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !data.tgl_keluar && "text-muted-foreground"
                                                )}
                                            >
                                                {data.tgl_keluar ? format(new Date(data.tgl_keluar), "yyyy-MM-dd") : "Pilih Tanggal"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={data.tgl_keluar ? new Date(data.tgl_keluar) : undefined}
                                                onSelect={(date) => handleDateSelect('tgl_keluar', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="tgl_kembali">Tanggal Kembali</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !data.tgl_kembali && "text-muted-foreground"
                                                )}
                                            >
                                                {data.tgl_kembali ? format(new Date(data.tgl_kembali), "yyyy-MM-dd") : "Pilih Tanggal"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={data.tgl_kembali ? new Date(data.tgl_kembali) : undefined}
                                                onSelect={(date) => handleDateSelect('tgl_kembali', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="tgl_masuk_pabrik">Tanggal Masuk Pabrik</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !data.tgl_masuk_pabrik && "text-muted-foreground"
                                                )}
                                            >
                                                {data.tgl_masuk_pabrik ? format(new Date(data.tgl_masuk_pabrik), "yyyy-MM-dd") : "Pilih Tanggal"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={data.tgl_masuk_pabrik ? new Date(data.tgl_masuk_pabrik) : undefined}
                                                onSelect={(date) => handleDateSelect('tgl_masuk_pabrik', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="keterangan">Keterangan</Label>
                                    <Input
                                        id="keterangan"
                                        type="text"
                                        name="keterangan"
                                        onChange={(e) => setData("keterangan", e.target.value)}
                                        value={data.keterangan}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Save Rekap</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;

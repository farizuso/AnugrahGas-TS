import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Rekap } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import React from 'react'
import Deleterkp from './Delete';
import Edit from './Edit';

export const rekapColumns: ColumnDef<Rekap>[] = [
  {
    id: "select",
    header: ({ table }) => (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
    ),
    cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
    ),
    enableSorting: false,
    enableHiding: false,
},
{
    accessorKey: "nama_pelanggan",
    header: "Nama Pelanggan",
    cell: ({ row }) => (
        <div className="capitalize">{row.original.nama_pelanggan}</div>
    ),
},
{
    accessorKey: "no_botol",
    header: "No. Botol",
    cell: ({ row }) => (
        <div className="capitalize">{row.original.produk.no_botol}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
        const value = row.original.produk.no_botol;
        return value.toString().toLowerCase().includes(filterValue.toLowerCase());
    },
},
{
    accessorKey: "alamat",
    header: "Alamat",
    cell: ({ row }) => (
        <div className="capitalize">{row.original.alamat}</div>
    ),
},
{
    accessorKey: "tgl_keluar",
    header: ({ column }) => {
        return (
            <Button
                variant="grey"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tgl Keluar
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => <div className="lowercase">{new Date(row.original.tgl_keluar).toLocaleDateString()}</div>,
},

{
    accessorKey: "tgl_kembali",
    header: ({ column }) => {
        return (
            <Button
                variant="grey"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tgl Kembali
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => <div className="lowercase">{new Date(row.original.tgl_kembali).toLocaleDateString()}</div>,
},
{
    accessorKey: "tgl_masuk_pabrik",
    header: ({ column }) => {
        return (
            <Button
                variant="grey"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tgl. Pabrik
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => <div className="lowercase">{new Date(row.original.tgl_masuk_pabrik).toLocaleDateString()}</div>,
},
{
    accessorKey: "keterangan",
    header: "Keterangan",
    cell: ({ row }) => (
        <div className="capitalize">{row.original.keterangan}</div>
    ),
},
{
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
        const rekap = row.original

        return (
            <div className="justify-center flex items-center gap-2">
                <Deleterkp rekapdelete={rekap}/>
                <Edit rekapedit={rekap}/>
            </div>
        )
    },
},
];
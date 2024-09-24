import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Delete, MoreHorizontal } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Rekap } from "@/types"
import Edit from "./Edit";
import Deleterkp from "./Delete";
// import { Card } from "@/Components/ui/card"

interface DataTableProps<TData, TValue> {
    data: TData[];
}

export const columns: ColumnDef<Rekap>[] = [
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
]

export function DataTable({ data }: DataTableProps<any, any>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter No Botol"
                    value={(table.getColumn("no_botol")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("no_botol")?.setFilterValue(event.target.value)
                    }
                    className="max-w-40"
                />
                <div className="w-full flex items-center justify-end gap-2 pr-2">
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border min-w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

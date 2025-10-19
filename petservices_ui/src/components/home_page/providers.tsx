import { useEffect, useMemo, useState } from "react";
import Navbar from "../reusable_component/Navbar";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_PaginationState,
} from "material-react-table";
import axios from "axios";
import { baseurl } from "./backend";
import type { Provider } from "./provider";
import dayjs from "dayjs";

export default function Providers() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchProviders = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${baseurl}/user/providers`, {
                    params: {
                        page: pagination.pageIndex + 1,
                        limit: pagination.pageSize,
                    },
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProviders(response.data.providers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProviders();
    }, [pagination]);

    const columns = useMemo<MRT_ColumnDef<Provider>[]>(
        () =>
            [
                {
                    accessorKey: "first_name",
                    header: "First Name",
                    size: 50,
                    Cell: ({ cell }) => (
                        <div className="flex items-center justify-center">
                            <input
                                type="text"
                                value={cell.getValue<string>()}
                                readOnly
                                className="text-center w-full bg-transparent border-none"
                            />
                        </div>
                    ),
                },
                {
                    accessorKey: "last_name",
                    header: "Last Name",
                    size: 50,
                    Cell: ({ cell }) => (
                        <div className="flex items-center justify-center">
                            <input
                                type="text"
                                value={cell.getValue<string>()}
                                readOnly
                                className="text-center w-full bg-transparent border-none"
                            />
                        </div>
                    ),
                },

                {
                    accessorKey: "email",
                    header: "Email",
                    size: 50,
                    Cell: ({ cell }) => (
                        <div className="flex items-center justify-center">
                            <input type="text" value={cell.getValue<string>()} readOnly />
                        </div>
                    ),
                },
                {
                    accessorKey: "is_Provider",
                    header: "Provider",
                    size: 50,
                    Cell: ({ cell }) => (
                        <div className="flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={cell.getValue<boolean>()}
                                readOnly
                                className="text-center w-full bg-transparent border-none"
                            />
                        </div>
                    ),
                },
                {
                    accessorKey: "created_at",
                    header: "Created At",
                    size: 150,
                    Cell: ({ cell }) => {
                        const rawDate = cell.getValue<string>();
                        const formattedDate = dayjs(rawDate).format("DD-MM-YYYY");

                        return (
                            <div className="flex items-center justify-center">
                                <input
                                    type="text"
                                    value={formattedDate}
                                    readOnly
                                    className="text-center w-full bg-transparent border-none"
                                />
                            </div>
                        );
                    },
                },
            ] as MRT_ColumnDef<Provider>[],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: providers,
        manualPagination: true,
        state: { pagination },
        onPaginationChange: setPagination,
        enableColumnFilters: false,
        enableSorting: true,
        muiPaginationProps: {
            rowsPerPageOptions: [5, 10, 20],
            showFirstButton: false,
            showLastButton: false,
            color: "primary",

            shape: "rounded",

            showRowsPerPage: false,

            variant: "outlined",
        },
        muiTableHeadCellProps: {
            sx: {
                borderRight: "2px solid rgba(0, 0, 0, 0.12)",
            },
        },
        muiTableBodyCellProps: {
            sx: {
                borderRight: "2px solid rgba(0, 0, 0, 0.12)",
            },
        },
        paginationDisplayMode: "pages",
    });

    return (
        <>
            <Navbar />
            <div className="flex justify-center w-full mt-20">
                <div className="w-3/4">
                    <MaterialReactTable table={table} />
                </div>
            </div>
        </>
    );
}

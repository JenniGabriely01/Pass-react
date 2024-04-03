import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react' /* biblioteca de icones - npm i lucide-react */
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'


dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
    const [searchInput, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const totalPges = Math.ceil(attendees.length / 10)
    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    function goToNextPage() {
        setPage(page + 1)
    }

    function goToPreviusPage() {
        setPage(page - 1)
    }

    function goToLastPage() {
        setPage(totalPges)
    }

    function goToFirstPage() {
        setPage(1)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Buscar Participante..." />
                </div>

                {searchInput}
            </div>



            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{ width: 48 }}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participantes</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        {/* a primeira { colocando js} a segunda { adicionando um obj} */}
                        <TableHeader style={{ width: 48 }} ></TableHeader>
                    </tr>
                </thead>

                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((atendee) => {
                        return (
                            <TableRow key={atendee.id} >
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400" />
                                </TableCell>
                                <TableCell>{atendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{atendee.name}</span>
                                        <span>{atendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs().to(atendee.createdAt)}</TableCell>
                                <TableCell>{dayjs().to(atendee.checkedInAt)}</TableCell>
                                <TableCell>
                                    <IconButton transparent={true}>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>

                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando 10 de {attendees.length} itens
                        </TableCell>
                        <TableCell className="text-right" colSpan={3}>

                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPges}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>

                                    <IconButton onClick={goToPreviusPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>

                                    <IconButton onClick={goToNextPage} disabled={page === totalPges}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>

                                    <IconButton onClick={goToLastPage} disabled={page === totalPges}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>

        </div>

    )
}
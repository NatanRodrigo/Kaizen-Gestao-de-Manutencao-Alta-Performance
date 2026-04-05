import { useState } from 'react';



export default function OrdemServico() {
    return (
        <div>
            <h1>Ordem de Serviço</h1>
            <p>Gerar nova ordem de serviço</p>

            <div>

                <button onClick={() => { }} class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class=" relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">

                        Gerar OS

                    </span>
                </button>
            </div>

        </div>
    )
}


import { Check, X } from 'lucide-react'
import { Button } from '../ui/button'

export function Streak() {
    return (
        <div className="rounded-md border p-5 flex items-center space-y-3">
            <div>
                <div className="">

                </div>
                <div className="">

                </div>
                <div className="">

                </div>
            </div>
            <div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
            <div>
                <Button type='submit' className='bg-green-700'>
                    <Check />
                </Button>
                <Button className='bg-red-600'>
                    <X />
                </Button>
            </div>
            <div>

            </div>
        </div>
    )
}

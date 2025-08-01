import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function PayForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer">
                    <Plus />
                </div>
            </DialogTrigger>
            <DialogContent>
                <form action="" className="space-y-2">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">Add To-Pay-List</DialogTitle>
                        <DialogDescription>Fill the form to create to-pay-list</DialogDescription>
                    </DialogHeader>
                    <hr />
                    <div className="space-y-3">
                        <Input placeholder="To-Pay name" />
                        <Input placeholder="DD/MM/YYYY"/>
                        <Input placeholder="Amount" type="number" />
                    </div>
                    <hr />
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-green-700">Add Pay-List</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
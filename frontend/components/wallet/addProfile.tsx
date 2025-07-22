import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DialogFooter, DialogHeader } from "../ui/dialog";

export function AddProf() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="text-3xl min-w-[180px] h-[180px] rounded-md border flex items-center justify-center bg-gray-100 cursor-pointer">
                    +
                </div>
            </DialogTrigger>
            <DialogContent className="w-sm border p-3 rounded-md">
                <form action="" className="space-y-5">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">Create Wallet</DialogTitle>
                        <DialogDescription>Create your new wallet profile</DialogDescription>
                    </DialogHeader>
                    <hr />
                    <div className="space-y-3">
                        <Input placeholder="Wallet name" />
                        <Input placeholder="Target (Optional)" />
                        <Input placeholder="Goal amount" type="number" />
                    </div>
                    <hr />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add Wallet</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
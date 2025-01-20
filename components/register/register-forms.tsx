import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpAction, signInAction } from "@/app/auth/registerAction";

export function SignInTab() {
    return (
        <form action={signInAction} className="h-full p-4 border rounded-md shadow-md flex flex-col justify-between">
            <div className="mb-4">
                <div className="text-xl font-medium">SIGN-IN</div>
                <span>Access your account by signing in.</span>
            </div>
            <div className="grow border-t py-4 space-y-6">
                <div className="space-y-2">
                    <div className="text-md">Email</div>
                    <Input
                        type="text"
                        name="email"
                        placeholder="usxxx@mail.com"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <div className="text-md">Password</div>
                    <Input 
                        type="password"
                        name="password"
                        placeholder="Password" 
                        required
                    />
                    <a href="#" className='flex justify-end text-xs text-red-600'>forgot password?</a>
                </div>
            </div>
            <div className="mt-4 space-y-4">
                <Button type="submit" className="w-full h-[50px] bg-green-600 text-lg">SUBMIT</Button>
            </div>
        </form>
    ) 
}

export function SignUpTab() {
    return(
        <form action={signUpAction} className="h-full p-4 border rounded-md shadow-md flex flex-col justify-between">
            <div className="mb-4">
                <div className="text-xl font-medium">SIGN-UP</div>
                <span>Create a new account to get started.</span>
            </div>
            <div className="grow border-t py-4 space-y-6">
                <div className="space-y-2">
                    <div className="text-md">Email</div>
                    <Input
                        type="text"
                        name="email"
                        placeholder="usxxx@mail.com"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <div className="text-md">Username</div>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <div className="text-md">Password</div>
                    <Input 
                        type="password"
                        name="password"
                        placeholder="Password" 
                        minLength={8}
                        required
                    />
                </div>
            </div>
            <div className="mt-4 space-y-4">
                <Button type="submit" className="w-full h-[50px] bg-green-600 text-lg">SUBMIT</Button>
            </div>
        </form>
    )
}
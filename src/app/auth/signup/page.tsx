import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Signup() {
  return (
    <div>
      <h1>Signup</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" name="password" />
        </div>
        <Button type="submit">Signup</Button>
      </form>
    </div>
  );
}

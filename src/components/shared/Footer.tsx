import Link from "next/link";
import { Container } from "@/components/ui";
import { APP_CONFIG, FOOTER_LINKS } from "@/constants/app";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="section-padding !py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">{APP_CONFIG.DESCRIPTION}</p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="space-y-3">
              <h4 className="text-sm font-semibold capitalize">{group}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

import { Link } from "react-router-dom";
export default function Landing() {
    return (
        <main>
            <div>
                <h1>Calisthenics AI</h1>
                <p>Personalized calisthenics routines powered by AI.</p>
                <blockquote>"Discipline is choosing between what you want now and what you want most."</blockquote>
                <Link to="/setup">Get Started →</Link>
            </div>
        </main>
    )
}
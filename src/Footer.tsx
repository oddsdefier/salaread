import { Github, Twitter } from "lucide-react";

export default function Footer() {
	return (
		<footer className="mt-auto py-6 px-4 sm:px-6 lg:px-8">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} @dyeppp. All rights reserved.</p>
				<div className="flex items-center space-x-4">
					<a href="https://github.com/dyeppp" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
						<Github className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
					</a>
					<a href="https://twitter.com/dyeppp" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
						<Twitter className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
					</a>
				</div>
			</div>
		</footer>
	);
}

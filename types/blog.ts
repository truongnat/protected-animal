export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	readingTime: string;
	excerpt?: string;
	tags?: string[];
	content?: string;
	image?: string;
}

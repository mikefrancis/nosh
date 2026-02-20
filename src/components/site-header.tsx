import { Mail, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useFeeds } from "@/components/feed-provider";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

const SiteHeader = () => {
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const {
		feeds,
		selectFeed,
		selectedFeedIndex,
		deleteFeed,
		updateFeed,
		readAllItems,
	} = useFeeds();
	const handleDelete = () => {
		deleteFeed(selectedFeedIndex as number);
		setDeleteDialogOpen(false);

		toast("Unsubscribed from feed");
	};

	const handleRefresh = async () => {
		if (!selectedFeedIndex) {
			return;
		}

		try {
			const response = await fetch(`/feed?url=${feeds[selectedFeedIndex].url}`);
			const data = await response.json();

			updateFeed(selectedFeedIndex, data);

			toast("Feed refreshed");
		} catch (error) {
			toast.warning("Error refreshing feed", {
				description:
					error instanceof Error
						? error.message
						: "Something went wrong, please try again later",
			});
		}
	};

	return (
		<div className="sticky top-0 z-10 bg-background border-b flex items-center justify-start gap-2 p-2">
			<SidebarTrigger />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<button onClick={() => selectFeed(undefined)}>Feeds</button>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{typeof selectedFeedIndex !== "undefined" ? (
						<>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage className="line-clamp-1">
									{feeds[selectedFeedIndex].title}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					) : null}
				</BreadcrumbList>
			</Breadcrumb>
			{typeof selectedFeedIndex !== "undefined" ? (
				<AlertDialog
					open={isDeleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
				>
					<DropdownMenu>
						<DropdownMenuTrigger className="ml-auto" asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<MoreHorizontal className="w-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => handleRefresh()}>
								<RefreshCw className="mr-2 h-4 w-4" />
								Refresh
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => readAllItems(selectedFeedIndex, true)}
							>
								<Mail className="mr-2 h-4 w-4" />
								Mark all as read
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<AlertDialogTrigger className="w-full">
									<Trash2 className="mr-2 h-4 w-4" />
									<span>Unsubscribe</span>
								</AlertDialogTrigger>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Unsubscribe from feed</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleDelete}>
								Confirm
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			) : null}
		</div>
	);
};

export { SiteHeader };

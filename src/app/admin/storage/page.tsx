
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useStorage } from '@/contexts/storage-context';
import { Checkbox } from '@/components/ui/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCopy, faFile, faImage, faFileVideo, faFileAudio, faFilePdf, faFileArchive, faFileCsv, faUpload } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const FileIcon = ({ mimeType }: { mimeType: string }) => {
    if (mimeType.startsWith('image/')) return <FontAwesomeIcon icon={faImage} className="h-5 w-5 text-blue-500" />;
    if (mimeType.startsWith('video/')) return <FontAwesomeIcon icon={faFileVideo} className="h-5 w-5 text-red-500" />;
    if (mimeType.startsWith('audio/')) return <FontAwesomeIcon icon={faFileAudio} className="h-5 w-5 text-purple-500" />;
    if (mimeType === 'application/pdf') return <FontAwesomeIcon icon={faFilePdf} className="h-5 w-5 text-red-700" />;
    if (mimeType.includes('zip') || mimeType.includes('archive')) return <FontAwesomeIcon icon={faFileArchive} className="h-5 w-5 text-yellow-600" />;
    if (mimeType.includes('csv')) return <FontAwesomeIcon icon={faFileCsv} className="h-5 w-5 text-green-700" />;
    return <FontAwesomeIcon icon={faFile} className="h-5 w-5 text-gray-500" />;
};

export default function AdminStoragePage() {
    const { toast } = useToast();
    const { files, deleteFiles, renameFile, uploadFile, loading } = useStorage();
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [renameOpen, setRenameOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<{ id: string; name: string } | null>(null);
    const [newName, setNewName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSelectAll = (checked: boolean | 'indeterminate') => {
        setSelectedFiles(checked === true ? files.map(f => f.id) : []);
    };

    const handleSelectFile = (id: string, checked: boolean) => {
        setSelectedFiles(prev => checked ? [...prev, id] : prev.filter(fileId => fileId !== id));
    };

    const handleDelete = (ids: string[]) => {
        deleteFiles(ids);
        toast({ title: 'Files Deleted', description: `${ids.length} file(s) have been deleted.` });
        setSelectedFiles([]);
    };

    const handleRename = () => {
        if (currentFile && newName) {
            renameFile(currentFile.id, newName);
            toast({ title: 'File Renamed', description: `Renamed to ${newName}` });
            setRenameOpen(false);
            setCurrentFile(null);
            setNewName('');
        }
    };
    
    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast({ title: 'URL Copied!', description: 'The file URL has been copied to your clipboard.' });
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files;
        if (selected && selected.length > 0) {
            Array.from(selected).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadFile({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        url: e.target?.result as string,
                    });
                };
                reader.readAsDataURL(file);
            });
            toast({ title: 'Upload Successful', description: `${selected.length} file(s) uploaded.` });
        }
    };


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Storage</h1>
                    <p className="text-muted-foreground">Manage your uploaded media and files.</p>
                </div>
                 <Button onClick={() => fileInputRef.current?.click()}>
                    <FontAwesomeIcon icon={faUpload} className="mr-2 h-4 w-4" />
                    Upload File(s)
                </Button>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                         <div>
                            <CardTitle>All Files</CardTitle>
                            <CardDescription>A list of all uploaded files.</CardDescription>
                        </div>
                        {selectedFiles.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        <FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
                                        Delete Selected ({selectedFiles.length})
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This will permanently delete {selectedFiles.length} files. This action cannot be undone.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(selectedFiles)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-2">
                            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selectedFiles.length > 0 && selectedFiles.length === files.length ? true : (selectedFiles.length > 0 ? 'indeterminate' : false)}
                                            onCheckedChange={handleSelectAll}
                                            aria-label="Select all files"
                                        />
                                    </TableHead>
                                    <TableHead>File Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Date Added</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {files.map((file) => (
                                    <TableRow key={file.id} data-state={selectedFiles.includes(file.id) ? 'selected' : undefined}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedFiles.includes(file.id)}
                                                onCheckedChange={(checked) => handleSelectFile(file.id, !!checked)}
                                                aria-label={`Select file ${file.name}`}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <FileIcon mimeType={file.type} />
                                                <span className="truncate max-w-xs">{file.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{file.type}</TableCell>
                                        <TableCell>{(file.size / 1024).toFixed(2)} KB</TableCell>
                                        <TableCell>{format(new Date(file.createdAt), 'PPP')}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleCopyUrl(file.url)}><FontAwesomeIcon icon={faCopy} className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" onClick={() => { setCurrentFile(file); setNewName(file.name); setRenameOpen(true); }}><FontAwesomeIcon icon={faPen} className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename File</DialogTitle>
                        <DialogDescription>Enter a new name for the file "{currentFile?.name}".</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Label htmlFor="new-name">New Name</Label>
                        <Input id="new-name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setRenameOpen(false)}>Cancel</Button>
                        <Button onClick={handleRename}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Image as ImageIcon, Video, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryUploadProps {
  onPhotosChange?: (files: File[]) => void;
  onMediaChange?: (files: File[]) => void;
  maxPhotos?: number;
  maxMediaSize?: number;
}

export function GalleryUpload({
  onPhotosChange,
  onMediaChange,
  maxPhotos = 5,
  maxMediaSize = 30,
}: GalleryUploadProps) {
  const [photos, setPhotos] = React.useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = React.useState<string[]>([]);
  const [audioVideo, setAudioVideo] = React.useState<File[]>([]);
  const [mediaNames, setMediaNames] = React.useState<string[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length + photos.length > maxPhotos) {
      alert(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    const newPhotos = [...photos, ...files];
    setPhotos(newPhotos);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...newPreviews]);

    if (onPhotosChange) {
      onPhotosChange(newPhotos);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);

    URL.revokeObjectURL(photoPreviews[index]);

    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);

    if (onPhotosChange) {
      onPhotosChange(newPhotos);
    }
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const oversizedFiles = files.filter(f => f.size > maxMediaSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Media files must be under ${maxMediaSize}MB`);
      return;
    }

    if (files.length + audioVideo.length > 3) {
      alert('Maximum 3 audio/video clips allowed');
      return;
    }

    const newMedia = [...audioVideo, ...files];
    setAudioVideo(newMedia);
    setMediaNames([...mediaNames, ...files.map(f => f.name)]);

    if (onMediaChange) {
      onMediaChange(newMedia);
    }
  };

  const removeMedia = (index: number) => {
    const newMedia = audioVideo.filter((_, i) => i !== index);
    const newNames = mediaNames.filter((_, i) => i !== index);

    setAudioVideo(newMedia);
    setMediaNames(newNames);

    if (onMediaChange) {
      onMediaChange(newMedia);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>Photo Gallery</span>
          </CardTitle>
          <CardDescription>
            Upload up to {maxPhotos} photos. Accepted formats: JPG, PNG
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <Badge className="absolute bottom-2 left-2 text-xs">
                      Photo {index + 1}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {photos.length < maxPhotos && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/jpeg,image/png,image/jpg"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Click to upload photos
                  </p>
                  <p className="text-xs text-gray-500">
                    {photos.length} of {maxPhotos} photos uploaded
                  </p>
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>Audio/Video Clips</span>
          </CardTitle>
          <CardDescription>
            Upload up to 3 audio or video clips (max {maxMediaSize}MB each, 30 seconds max)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mediaNames.length > 0 && (
              <div className="space-y-2">
                {mediaNames.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {name.includes('audio') || name.endsWith('.mp3') || name.endsWith('.wav') ? (
                        <Music className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Video className="h-5 w-5 text-purple-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{name}</p>
                        <p className="text-xs text-gray-500">
                          {(audioVideo[index].size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedia(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {audioVideo.length < 3 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
                <input
                  type="file"
                  id="media-upload"
                  accept="audio/*,video/*"
                  multiple
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <div className="flex justify-center space-x-2 mb-3">
                    <Music className="h-10 w-10 text-gray-400" />
                    <Video className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Click to upload audio/video
                  </p>
                  <p className="text-xs text-gray-500">
                    {audioVideo.length} of 3 clips uploaded • Max {maxMediaSize}MB per file
                  </p>
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

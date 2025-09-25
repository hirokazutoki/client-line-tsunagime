"use client";

import { useState, useEffect } from "react";
import MapPicker from "@/components/MapPicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ValidationErrors = {
  description?: string[];
  address?: string[];
  message?: string;
};

export function HelpRequestForm() {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Get token from cookie when component mounts
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
      return null;
    };

    setToken(getCookie('apiToken'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Authentication token not found. Please log in again.");
      return;
    }

    if (lat === null || lng === null) {
      alert("地図から位置を選んでください");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // NOTE: クライエントサイド実行なので、localhost:8000
      const response = await fetch(`http://localhost:8000/api/v1/help-requests`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          address,
          lat,
          lng,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (response.status === 422 && data.errors) {
          setErrors(data.errors);
          return;
        } else if (data.message) {
          setErrors({ message: data.message });
          return;
        } else {
          throw new Error('Unknown error occurred');
        }
      }

      // Success case
      setDescription("");
      setAddress("");
      alert("Help request created!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to create help request:", error);
      setErrors({ message: "Failed to create help request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Add New Help Requests</CardTitle>
        <CardDescription>Enter a URL and title to add to your help requests collection</CardDescription>
      </CardHeader>
      <CardContent>
        {errors.message && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
            {errors.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="..."
              required
              disabled={isSubmitting}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Address
            </label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Null City"
              disabled={isSubmitting}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>
            )}
          </div>

            <MapPicker
                onSelectAction={(lat, lng) => {
                    setLat(lat);
                    setLng(lng);
                }}
            />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !token}
          >
            {isSubmitting ? "Adding..." : "Add Help Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

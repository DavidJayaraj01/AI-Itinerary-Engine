import { useState, useEffect } from 'react';
import { tripService } from '../api';
import { Trip, TripStatus } from '../api/types';

export const useTrips = (status?: TripStatus) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tripService.getTrips(status);
      if (response.success && response.data) {
        setTrips(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch trips');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [status]);

  return {
    trips,
    isLoading,
    error,
    refetch: fetchTrips,
  };
};

export const useTrip = (id: number) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrip = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tripService.getTripById(id);
      if (response.success && response.data) {
        setTrip(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch trip');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTrip();
    }
  }, [id]);

  return {
    trip,
    isLoading,
    error,
    refetch: fetchTrip,
  };
};

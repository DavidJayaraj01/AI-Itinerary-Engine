import { useState, useEffect } from 'react';
import { activityService } from '../api';
import { Activity, ActivitySearchParams } from '../api/types';

export const useActivities = (params: ActivitySearchParams) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchActivities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await activityService.search(params);
      if (response.success && response.data) {
        setActivities(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to search activities');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchActivities();
  }, [JSON.stringify(params)]);

  return {
    activities,
    isLoading,
    error,
    refetch: searchActivities,
  };
};

export const useActivity = (id: number) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await activityService.getById(id);
      if (response.success && response.data) {
        setActivity(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch activity');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchActivity();
    }
  }, [id]);

  return {
    activity,
    isLoading,
    error,
    refetch: fetchActivity,
  };
};

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          address: string | null;
          attachments: Json;
          author_id: string | null;
          body: string | null;
          category: string;
          contact: string | null;
          created_at: string;
          ends_at: string | null;
          heads_up: string | null;
          id: string;
          is_important: boolean;
          is_public: boolean;
          location: string | null;
          notice: string | null;
          pinned: boolean;
          quick_facts: Json;
          starts_at: string | null;
          subtitle: string | null;
          summary: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          attachments?: Json;
          author_id?: string | null;
          body?: string | null;
          category?: string;
          contact?: string | null;
          created_at?: string;
          ends_at?: string | null;
          heads_up?: string | null;
          id?: string;
          is_important?: boolean;
          is_public?: boolean;
          location?: string | null;
          notice?: string | null;
          pinned?: boolean;
          quick_facts?: Json;
          starts_at?: string | null;
          subtitle?: string | null;
          summary?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          attachments?: Json;
          author_id?: string | null;
          body?: string | null;
          category?: string;
          contact?: string | null;
          created_at?: string;
          ends_at?: string | null;
          heads_up?: string | null;
          id?: string;
          is_important?: boolean;
          is_public?: boolean;
          location?: string | null;
          notice?: string | null;
          pinned?: boolean;
          quick_facts?: Json;
          starts_at?: string | null;
          subtitle?: string | null;
          summary?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'announcements_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      departments: {
        Row: {
          created_at: string;
          faculty_id: string;
          id: string;
          logo_uri: string | null;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          faculty_id: string;
          id?: string;
          logo_uri?: string | null;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          faculty_id?: string;
          id?: string;
          logo_uri?: string | null;
          name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'departments_faculty_id_fkey';
            columns: ['faculty_id'];
            isOneToOne: false;
            referencedRelation: 'faculties';
            referencedColumns: ['id'];
          },
        ];
      };
      event_attendance: {
        Row: {
          created_at: string;
          event_id: string;
          id: string;
          profile_id: string;
          status: Database['public']['Enums']['event_attendance_status'];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          id?: string;
          profile_id: string;
          status: Database['public']['Enums']['event_attendance_status'];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          id?: string;
          profile_id?: string;
          status?: Database['public']['Enums']['event_attendance_status'];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_attendance_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_attendance_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      event_invites: {
        Row: {
          created_at: string;
          event_id: string;
          id: string;
          profile_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          id?: string;
          profile_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          id?: string;
          profile_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_invites_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_invites_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      event_scopes: {
        Row: {
          created_at: string;
          event_id: string;
          id: string;
          scope_type: Database['public']['Enums']['event_scope_type'];
          scope_value: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          id?: string;
          scope_type: Database['public']['Enums']['event_scope_type'];
          scope_value: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          id?: string;
          scope_type?: Database['public']['Enums']['event_scope_type'];
          scope_value?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_scopes_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      events: {
        Row: {
          can_book_canopy: boolean;
          capacity: number | null;
          category: string;
          cover_image: string | null;
          created_at: string;
          description: string | null;
          disable_attendance: boolean;
          ends_at: string | null;
          going_count: number;
          id: string;
          interested_count: number;
          is_featured: boolean;
          location: string | null;
          organizer_id: string | null;
          starts_at: string;
          title: string;
          updated_at: string;
          visibility: Database['public']['Enums']['event_visibility'];
        };
        Insert: {
          can_book_canopy?: boolean;
          capacity?: number | null;
          category?: string;
          cover_image?: string | null;
          created_at?: string;
          description?: string | null;
          disable_attendance?: boolean;
          ends_at?: string | null;
          going_count?: number;
          id?: string;
          interested_count?: number;
          is_featured?: boolean;
          location?: string | null;
          organizer_id?: string | null;
          starts_at: string;
          title: string;
          updated_at?: string;
          visibility?: Database['public']['Enums']['event_visibility'];
        };
        Update: {
          can_book_canopy?: boolean;
          capacity?: number | null;
          category?: string;
          cover_image?: string | null;
          created_at?: string;
          description?: string | null;
          disable_attendance?: boolean;
          ends_at?: string | null;
          going_count?: number;
          id?: string;
          interested_count?: number;
          is_featured?: boolean;
          location?: string | null;
          organizer_id?: string | null;
          starts_at?: string;
          title?: string;
          updated_at?: string;
          visibility?: Database['public']['Enums']['event_visibility'];
        };
        Relationships: [
          {
            foreignKeyName: 'events_organizer_id_fkey';
            columns: ['organizer_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      faculties: {
        Row: {
          created_at: string;
          id: string;
          logo_uri: string | null;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          logo_uri?: string | null;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          logo_uri?: string | null;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      hostel_photos: {
        Row: {
          caption: string | null;
          created_at: string;
          hostel_id: string;
          id: string;
          is_featured: boolean;
          position: number;
          storage_path: string;
        };
        Insert: {
          caption?: string | null;
          created_at?: string;
          hostel_id: string;
          id?: string;
          is_featured?: boolean;
          position?: number;
          storage_path: string;
        };
        Update: {
          caption?: string | null;
          created_at?: string;
          hostel_id?: string;
          id?: string;
          is_featured?: boolean;
          position?: number;
          storage_path?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'hostel_photos_hostel_id_fkey';
            columns: ['hostel_id'];
            isOneToOne: false;
            referencedRelation: 'hostels';
            referencedColumns: ['id'];
          },
        ];
      };
      hostels: {
        Row: {
          address: string | null;
          agent_avatar_url: string | null;
          agent_email: string | null;
          agent_name: string | null;
          bathrooms: number | null;
          bedrooms: number | null;
          campus: boolean;
          contact: string | null;
          created_at: string;
          description: string | null;
          facilities: string[];
          hero_image_url: string | null;
          id: string;
          is_featured: boolean;
          name: string;
          payment_term: Database['public']['Enums']['hostel_payment_term'] | null;
          price: number;
          rating: number | null;
          type: string;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          agent_avatar_url?: string | null;
          agent_email?: string | null;
          agent_name?: string | null;
          bathrooms?: number | null;
          bedrooms?: number | null;
          campus?: boolean;
          contact?: string | null;
          created_at?: string;
          description?: string | null;
          facilities?: string[];
          hero_image_url?: string | null;
          id?: string;
          is_featured?: boolean;
          name: string;
          payment_term?: Database['public']['Enums']['hostel_payment_term'] | null;
          price: number;
          rating?: number | null;
          type?: string;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          agent_avatar_url?: string | null;
          agent_email?: string | null;
          agent_name?: string | null;
          bathrooms?: number | null;
          bedrooms?: number | null;
          campus?: boolean;
          contact?: string | null;
          created_at?: string;
          description?: string | null;
          facilities?: string[];
          hero_image_url?: string | null;
          id?: string;
          is_featured?: boolean;
          name?: string;
          payment_term?: Database['public']['Enums']['hostel_payment_term'] | null;
          price?: number;
          rating?: number | null;
          type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      listing_fee_plans: {
        Row: {
          active: boolean;
          created_at: string;
          currency: string;
          featured_fee: number;
          id: string;
          name: string;
          normal_fee: number;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          currency?: string;
          featured_fee: number;
          id?: string;
          name: string;
          normal_fee: number;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          currency?: string;
          featured_fee?: number;
          id?: string;
          name?: string;
          normal_fee?: number;
        };
        Relationships: [];
      };
      market_categories: {
        Row: {
          color: string | null;
          created_at: string;
          icon: string | null;
          id: string;
          name: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          icon?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          icon?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      market_listing_variants: {
        Row: {
          attributes: Json;
          created_at: string;
          currency: string | null;
          id: string;
          is_active: boolean;
          is_in_stock: boolean;
          label: string;
          listing_id: string;
          price: number | null;
          sku: string | null;
          stock_qty: number | null;
          updated_at: string;
        };
        Insert: {
          attributes?: Json;
          created_at?: string;
          currency?: string | null;
          id?: string;
          is_active?: boolean;
          is_in_stock?: boolean;
          label: string;
          listing_id: string;
          price?: number | null;
          sku?: string | null;
          stock_qty?: number | null;
          updated_at?: string;
        };
        Update: {
          attributes?: Json;
          created_at?: string;
          currency?: string | null;
          id?: string;
          is_active?: boolean;
          is_in_stock?: boolean;
          label?: string;
          listing_id?: string;
          price?: number | null;
          sku?: string | null;
          stock_qty?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'market_listing_variants_listing_id_fkey';
            columns: ['listing_id'];
            isOneToOne: false;
            referencedRelation: 'market_listings';
            referencedColumns: ['id'];
          },
        ];
      };
      market_listings: {
        Row: {
          call_contact: string | null;
          category_id: string | null;
          condition: string | null;
          created_at: string;
          currency: string;
          description: string | null;
          hero_image_url: string | null;
          id: string;
          is_active: boolean;
          is_approved: boolean;
          is_featured: boolean;
          is_in_stock: boolean;
          placement_fee_amount: number | null;
          placement_fee_currency: string | null;
          placement_fee_paid: boolean;
          placement_paid_at: string | null;
          placement_type: Database['public']['Enums']['market_placement_type'];
          price: number;
          rating: number;
          rating_count: number;
          seller_id: string | null;
          stock_qty: number | null;
          title: string;
          updated_at: string;
          whatsapp_contact: string | null;
        };
        Insert: {
          call_contact?: string | null;
          category_id?: string | null;
          condition?: string | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          hero_image_url?: string | null;
          id?: string;
          is_active?: boolean;
          is_approved?: boolean;
          is_featured?: boolean;
          is_in_stock?: boolean;
          placement_fee_amount?: number | null;
          placement_fee_currency?: string | null;
          placement_fee_paid?: boolean;
          placement_paid_at?: string | null;
          placement_type?: Database['public']['Enums']['market_placement_type'];
          price: number;
          rating?: number;
          rating_count?: number;
          seller_id?: string | null;
          stock_qty?: number | null;
          title: string;
          updated_at?: string;
          whatsapp_contact?: string | null;
        };
        Update: {
          call_contact?: string | null;
          category_id?: string | null;
          condition?: string | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          hero_image_url?: string | null;
          id?: string;
          is_active?: boolean;
          is_approved?: boolean;
          is_featured?: boolean;
          is_in_stock?: boolean;
          placement_fee_amount?: number | null;
          placement_fee_currency?: string | null;
          placement_fee_paid?: boolean;
          placement_paid_at?: string | null;
          placement_type?: Database['public']['Enums']['market_placement_type'];
          price?: number;
          rating?: number;
          rating_count?: number;
          seller_id?: string | null;
          stock_qty?: number | null;
          title?: string;
          updated_at?: string;
          whatsapp_contact?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'market_listings_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'market_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'market_listings_seller_id_fkey';
            columns: ['seller_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      market_photos: {
        Row: {
          caption: string | null;
          created_at: string;
          id: string;
          is_featured: boolean;
          listing_id: string;
          position: number;
          storage_path: string;
        };
        Insert: {
          caption?: string | null;
          created_at?: string;
          id?: string;
          is_featured?: boolean;
          listing_id: string;
          position?: number;
          storage_path: string;
        };
        Update: {
          caption?: string | null;
          created_at?: string;
          id?: string;
          is_featured?: boolean;
          listing_id?: string;
          position?: number;
          storage_path?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'market_photos_listing_id_fkey';
            columns: ['listing_id'];
            isOneToOne: false;
            referencedRelation: 'market_listings';
            referencedColumns: ['id'];
          },
        ];
      };
      notifications: {
        Row: {
          actor_id: string | null;
          body: string | null;
          created_at: string;
          data: Json;
          id: string;
          link_id: string | null;
          link_type: string | null;
          read: boolean;
          recipient_id: string;
          title: string;
          type: string;
        };
        Insert: {
          actor_id?: string | null;
          body?: string | null;
          created_at?: string;
          data?: Json;
          id?: string;
          link_id?: string | null;
          link_type?: string | null;
          read?: boolean;
          recipient_id: string;
          title: string;
          type: string;
        };
        Update: {
          actor_id?: string | null;
          body?: string | null;
          created_at?: string;
          data?: Json;
          id?: string;
          link_id?: string | null;
          link_type?: string | null;
          read?: boolean;
          recipient_id?: string;
          title?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_actor_id_fkey';
            columns: ['actor_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notifications_recipient_id_fkey';
            columns: ['recipient_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          completed: boolean;
          created_at: string;
          department_id: string | null;
          email: string | null;
          faculty_id: string | null;
          full_name: string | null;
          id: string;
          index_number: string | null;
          level: number | null;
          onboarding_completed_at: string | null;
          phone: string | null;
          program_id: number | null;
          updated_at: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          completed?: boolean;
          created_at?: string;
          department_id?: string | null;
          email?: string | null;
          faculty_id?: string | null;
          full_name?: string | null;
          id: string;
          index_number?: string | null;
          level?: number | null;
          onboarding_completed_at?: string | null;
          phone?: string | null;
          program_id?: number | null;
          updated_at?: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          completed?: boolean;
          created_at?: string;
          department_id?: string | null;
          email?: string | null;
          faculty_id?: string | null;
          full_name?: string | null;
          id?: string;
          index_number?: string | null;
          level?: number | null;
          onboarding_completed_at?: string | null;
          phone?: string | null;
          program_id?: number | null;
          updated_at?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_department_id_fkey';
            columns: ['department_id'];
            isOneToOne: false;
            referencedRelation: 'departments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profiles_faculty_id_fkey';
            columns: ['faculty_id'];
            isOneToOne: false;
            referencedRelation: 'faculties';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profiles_program_id_fkey';
            columns: ['program_id'];
            isOneToOne: false;
            referencedRelation: 'programs';
            referencedColumns: ['id'];
          },
        ];
      };
      programs: {
        Row: {
          created_at: string;
          department: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          department: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          department?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'programs_department_fkey';
            columns: ['department'];
            isOneToOne: false;
            referencedRelation: 'departments';
            referencedColumns: ['id'];
          },
        ];
      };
      todo: {
        Row: {
          completed: boolean | null;
          created_at: string;
          id: number;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          completed?: boolean | null;
          created_at?: string;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          completed?: boolean | null;
          created_at?: string;
          id?: number;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      refresh_hostel_hero_image: {
        Args: { p_hostel_id: string };
        Returns: undefined;
      };
      refresh_listing_hero_image: {
        Args: { p_listing_id: string };
        Returns: undefined;
      };
    };
    Enums: {
      event_attendance_status: 'interested' | 'going' | 'not_going';
      event_scope_type: 'faculty' | 'department' | 'level';
      event_visibility: 'public' | 'scoped' | 'invite_only';
      hostel_payment_term: 'yearly' | 'semester' | 'academic_year';
      listing_submission_status: 'submitted' | 'payment_pending' | 'paid' | 'approved' | 'rejected';
      market_placement_type: 'normal' | 'featured';
      payment_status: 'pending' | 'succeeded' | 'failed' | 'refunded';
      payment_type: 'listing_fee' | 'purchase' | 'wallet_topup' | 'booking_fee';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      event_attendance_status: ['interested', 'going', 'not_going'],
      event_scope_type: ['faculty', 'department', 'level'],
      event_visibility: ['public', 'scoped', 'invite_only'],
      hostel_payment_term: ['yearly', 'semester', 'academic_year'],
      listing_submission_status: ['submitted', 'payment_pending', 'paid', 'approved', 'rejected'],
      market_placement_type: ['normal', 'featured'],
      payment_status: ['pending', 'succeeded', 'failed', 'refunded'],
      payment_type: ['listing_fee', 'purchase', 'wallet_topup', 'booking_fee'],
    },
  },
} as const;

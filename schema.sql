--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.2
-- Dumped by pg_dump version 9.5.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS mgcrud;
--
-- Name: mgcrud; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE mgcrud WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect mgcrud

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Categories" (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Categories_id_seq" OWNED BY "Categories".id;


--
-- Name: Locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Locations" (
    id integer NOT NULL,
    name character varying(255),
    description text,
    access text,
    hours character varying(255),
    address character varying(255),
    latlong character varying(255),
    website character varying(255),
    email character varying(255),
    phone character varying(255),
    picture character varying(255),
    visible boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- Name: Locations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Locations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Locations_id_seq" OWNED BY "Locations".id;


--
-- Name: People; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "People" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    phone character varying(255),
    picture character varying(255),
    moniker character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    location_id integer,
    office_hours character varying(255),
    office_address character varying(255),
    bio text,
    website character varying(255)
);


--
-- Name: People_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "People_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: People_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "People_id_seq" OWNED BY "People".id;


--
-- Name: Tools; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Tools" (
    id integer NOT NULL,
    name character varying(255),
    make character varying(255),
    model character varying(255),
    picture character varying(255),
    location_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    quantity character varying(50),
    category_id integer
);


--
-- Name: Tools_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Tools_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Tools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Tools_id_seq" OWNED BY "Tools".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Users" (
    username character varying(55) NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    id integer NOT NULL,
    email text,
    img text,
    fullname text NOT NULL
);


--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Categories" ALTER COLUMN id SET DEFAULT nextval('"Categories_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Locations" ALTER COLUMN id SET DEFAULT nextval('"Locations_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "People" ALTER COLUMN id SET DEFAULT nextval('"People_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Tools" ALTER COLUMN id SET DEFAULT nextval('"Tools_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Name: Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- Name: Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY (id);


--
-- Name: People_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "People"
    ADD CONSTRAINT "People_pkey" PRIMARY KEY (id);


--
-- Name: Tools_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Tools"
    ADD CONSTRAINT "Tools_pkey" PRIMARY KEY (id);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: users_unique_username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT users_unique_username UNIQUE (username);


--
-- Name: category_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Tools"
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES "Categories"(id);


--
-- Name: location_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Tools"
    ADD CONSTRAINT location_id FOREIGN KEY (location_id) REFERENCES "Locations"(id);


--
-- Name: location_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "People"
    ADD CONSTRAINT location_id FOREIGN KEY (location_id) REFERENCES "Locations"(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


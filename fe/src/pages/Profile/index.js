import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import awsLogo from '../../assets/awsLogo.png';

const Profile = () => {
  const enterpriseName = localStorage.getItem('ENTERPRISE_NAME');
  const enterpriseId = localStorage.getItem('ENTERPRISE_ID');
  const enterpriseToken = localStorage.getItem('ENTERPRISE_TOKEN');

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await api.get('profile', {
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${enterpriseToken}`, // auth.token
        },
      });
      console.log('profile', response);
      console.log(services);
      setServices(response.data);
    };
    fetchServices();
  }, [enterpriseId]);

  const handleDeleteService = async id => {
    try {
      await api.delete(`services/${id}`, {
        headers: {
          Authorization: `Bearer ${enterpriseToken}`, // auth.token
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="profile-container">
      <header>
        <img src={awsLogo} alt="awsLogo" />
        <span>Welcome to services, {enterpriseName}</span>
        <Link className="button" to="/services/new">
          Add service
        </Link>
        <button type="button">
          <FiPower size={18} color="#fc9802" />
        </button>
      </header>
      <h1>Services</h1>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <strong>Title</strong>
            <p>{service.title}</p>
            <strong>Description</strong>
            <p>{service.description}</p>
            <strong>Value</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(service.value)}
            </p>
            <button
              onClick={() => handleDeleteService(service.id)}
              type="button"
            >
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
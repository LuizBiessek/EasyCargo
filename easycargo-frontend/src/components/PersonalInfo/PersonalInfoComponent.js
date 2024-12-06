import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './personalInfoStyle.module.css';

const PersonalInfoComponent = ({ driverId }) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    cpfCnpj: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const allowedFields = ['name', 'cpfCnpj', 'email', 'phone', 'street', 'number', 'city', 'state', 'country', 'zipCode'];

  const fieldLabels = {
    name: 'Nome Completo',
    cpfCnpj: 'CPF/CNPJ',
    email: 'E-mail',
    phone: 'Telefone',
    street: 'Rua',
    number: 'Número',
    city: 'Cidade',
    state: 'Estado',
    country: 'País',
    zipCode: 'CEP',
  };

  const fetchPersonalInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:3000/api/users/${driverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredData = Object.keys(data)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});

      setPersonalInfo(filteredData);
    } catch (error) {
      console.error('Erro ao buscar informações pessoais:', error);
      alert('Erro ao carregar informações pessoais. Tente novamente.');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const allowedFields = ['name', 'email', 'phone', 'street', 'number', 'city', 'state', 'country', 'zipCode'];
      const filteredPersonalInfo = Object.keys(personalInfo)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = personalInfo[key];
          return obj;
        }, {});
  
      await axios.put(`http://localhost:3000/api/users/${driverId}`, filteredPersonalInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert('Informações atualizadas com sucesso!');
      setIsEditing(false);
      fetchPersonalInfo(); // Atualiza as informações exibidas
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      alert('Erro ao atualizar informações. Tente novamente.');
    }
  };
  

  useEffect(() => {
    if (driverId) {
      fetchPersonalInfo();
    }
  }, [driverId]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Informações Pessoais</h1>
      <form className={styles.infoForm} onSubmit={(e) => e.preventDefault()}>
        {Object.keys(personalInfo).map((key) => (
          <label key={key} className={styles.label}>
            {fieldLabels[key]}:
            <input
              type={key === 'email' ? 'email' : 'text'}
              value={personalInfo[key]}
              onChange={(e) => setPersonalInfo({ ...personalInfo, [key]: e.target.value })}
              disabled={!isEditing || key === 'cpfCnpj'}
              className={styles.input}
            />
          </label>
        ))}
        <div className={styles.buttonContainer}>
          {isEditing ? (
            <button onClick={handleSaveChanges} className={styles.saveButton}>
              Salvar
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className={styles.editButton}>
              Editar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoComponent;

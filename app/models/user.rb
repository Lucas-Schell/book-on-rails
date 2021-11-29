class User < ApplicationRecord
  has_secure_password
  has_many :books

  validates_presence_of :name, message: 'O nome é obrigatório.'
  validates :email, presence: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'O email não é válido.' }
  validates_length_of :password, in: 6..30, message: 'A senha deve ter pelo menos 6 caracteres.'
  validate :check_password_confirmation
  def check_password_confirmation
    errors.add(:password_confirmation, 'As senhas devem ser iguais.') if :password != :password_confirmation
  end
end
